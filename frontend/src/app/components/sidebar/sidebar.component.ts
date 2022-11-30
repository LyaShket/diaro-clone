import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces/category';
import { DiaryCategoryService } from '../../shared/services/diary-category.service';
import { filter, first, take, takeLast, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ITag } from '../../interfaces/tag';
import { DiaryTagService } from '../../shared/services/diary-tag.service';
import { ISearchEntriesQuery } from '../../shared/interfaces/search-entries-query';
import { Observable, Subject } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import { APP_DATE_FORMATS, AppDateAdapter } from './app-date-adapter';
import { AuthService } from '../../shared/services/auth.service';
import { IUser } from '../../shared/interfaces/user';
import { DiaryEntryService } from '../../shared/services/diary-entry.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  categories: ICategory[] = [];
  tags: ITag[] = [];
  moodList: string[] = ['Awesome', 'Happy', 'Neutral', 'Bad', 'Awful'];

  searchCategories: string[] = [];
  searchTags: string[] = [];
  searchMoods: string[] = [];
  searchTimeFrom: string = '';
  searchTimeTo: string = '';
  searchText: string = '';

  user$: Observable<IUser>;

  private destroyed$ = new Subject();

  constructor(
    private readonly diaryCategoryService: DiaryCategoryService,
    private readonly diaryTagService: DiaryTagService,
    private readonly diaryEntryService: DiaryEntryService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
  ) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.diaryEntryService.clearFilters$.pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.searchCategories = [];
        this.searchTags = [];
        this.searchMoods = [];
        this.searchTimeFrom = '';
        this.searchTimeTo = '';
        this.searchText = '';
      });

    this.diaryCategoryService.getAll().pipe(take(1)).subscribe(res => {
      if (!res) {
        return;
      }

      this.categories = res;
      this.cdr.detectChanges();
    });

    this.diaryTagService.getAll().pipe(take(1)).subscribe(res => {
      if (!res) {
        return;
      }

      this.tags = res;
      this.cdr.detectChanges();
    });

    this.route.queryParamMap
      .pipe(
        takeUntil(this.destroyed$),
        filter((i: any) => Object.keys(i.params).length > 0),
        first()
      )
      .subscribe((res: any) => {
        const categoryQuery = res?.params?.category;
        if (categoryQuery) {
          this.searchCategories = categoryQuery.split(',');
        }

        const tagQuery = res?.params?.tag;
        if (tagQuery) {
          this.searchTags = tagQuery.split(',');
        }

        const moodQuery = res?.params?.mood;
        if (moodQuery) {
          this.searchMoods = moodQuery.split(',');
        }

        const timeFromQuery = res?.params?.timeFrom;
        if (timeFromQuery) {
          this.searchTimeFrom = new Date(+timeFromQuery).toJSON();
        }

        const timeToQuery = res?.params?.timeTo;
        if (timeToQuery) {
          this.searchTimeTo = new Date(+timeToQuery).toJSON();
        }

        const text = res?.params?.text;
        if (text) {
          this.searchText = text;
        }

        this.navigateSearch();
      });
  }

  navigateSearch() {
    if (!this.searchCategories.length && !this.searchTags.length && !this.searchMoods.length && !this.searchTimeFrom && !this.searchTimeTo && !this.searchText) {
      this.router.navigate(['/']);
      return;
    }

    const queryParams: ISearchEntriesQuery = {};
    if (this.searchCategories.length > 0) {
      queryParams.category = this.searchCategories.join(',');
    }
    if (this.searchTags.length > 0) {
      queryParams.tag = this.searchTags.join(',');
    }
    if (this.searchMoods.length > 0) {
      queryParams.mood = this.searchMoods.join(',');
    }
    if (this.searchTimeFrom) {
      queryParams.timeFrom = new Date(this.searchTimeFrom).getTime().toString();
    }
    if (this.searchTimeTo) {
      queryParams.timeTo = new Date(this.searchTimeTo).getTime().toString();
    }
    if (this.searchText) {
      queryParams.text = this.searchText;
    }

    this.router.navigate(['/search'], { queryParams });
  }

  clickCategory(name: string) {
    if (this.searchCategories.indexOf(name) > -1) {
      this.searchCategories = this.searchCategories.filter(i => i !== name);
    } else {
      this.searchCategories.push(name);
    }

    this.navigateSearch();
  }

  clickTag(name: string) {
    if (this.searchTags.indexOf(name) > -1) {
      this.searchTags = this.searchTags.filter(i => i !== name);
    } else {
      this.searchTags.push(name);
    }

    this.navigateSearch();
  }

  clickMood(mood: string) {
    if (this.searchMoods.indexOf(mood) > -1) {
      this.searchMoods = this.searchMoods.filter(i => i !== mood);
    } else {
      this.searchMoods.push(mood);
    }

    this.navigateSearch();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

}
