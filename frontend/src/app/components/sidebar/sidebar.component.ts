import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ICategory} from "../../interfaces/category";
import {DiaryCategoryService} from "../../shared/services/diary-category.service";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
import {ITag} from "../../interfaces/tag";
import {DiaryTagService} from "../../shared/services/diary-tag.service";
import {ISearchEntriesQuery} from "../../shared/interfaces/search-entries-query";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories: ICategory[] = [];
  tags: ITag[] = [];
  moodList: string[] = ['Awesome', 'Happy', 'Neutral', 'Bad', 'Awful'];

  searchCategories: string[] = [];
  searchTags: string[] = [];
  searchMoods: string[] = [];
  searchTimeFrom: string = '';
  searchTimeTo: string = '';

  constructor(
    private readonly diaryCategoryService: DiaryCategoryService,
    private readonly diaryTagService: DiaryTagService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
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
  }

  navigateSearch() {
    if (!this.searchCategories.length && !this.searchTags.length && !this.searchMoods.length && !this.searchTimeFrom && !this.searchTimeTo) {
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

    this.router.navigate(['/search'], {queryParams});
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

}
