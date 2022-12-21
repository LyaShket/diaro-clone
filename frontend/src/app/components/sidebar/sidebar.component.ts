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
import { Select, Store } from '@ngxs/store';
import { TagState } from '../../store/states/tag.state';
import { CategoryState } from '../../store/states/category.state';
import { LoadCategories } from '../../store/actions/category.actions';
import { LoadTags } from '../../store/actions/tag.actions';
import { ISearchForm, SearchState } from '../../store/states/search.state';
import {
  InitValuesFromUrlParams,
  NavigateSearch,
  UpdateForm
} from '../../store/actions/search.actions';
import { AuthState } from '../../store/states/auth.state';

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
  @Select(AuthState.getUser) user$: Observable<IUser>;

  @Select(TagState.getTags) tags$: Observable<ITag[]>;
  @Select(CategoryState.getCategories) categories$: Observable<ICategory[]>;

  @Select(SearchState.getForm) formValues$: Observable<ISearchForm>;

  private destroyed$ = new Subject();

  constructor(
    private readonly diaryCategoryService: DiaryCategoryService,
    private readonly diaryTagService: DiaryTagService,
    private readonly diaryEntryService: DiaryEntryService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        takeUntil(this.destroyed$),
        filter((i: any) => Object.keys(i.params).length > 0),
        first()
      )
      .subscribe((res: any) => {
        this.store.dispatch(new InitValuesFromUrlParams(res?.params));
        this.store.dispatch(new NavigateSearch());
      });

    this.store.dispatch(new LoadCategories());
    this.store.dispatch(new LoadTags());
  }

  updateForm(form: ISearchForm) {
    this.store.dispatch(new UpdateForm(form));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }
}
