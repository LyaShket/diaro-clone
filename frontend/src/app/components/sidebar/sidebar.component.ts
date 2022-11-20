import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ICategory} from "../../interfaces/category";
import {DiaryCategoryService} from "../../shared/services/diary-category.service";
import {take} from "rxjs/operators";
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
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
    if (this.searchCategories.length === 0 && this.searchTags.length === 0) {
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

  clickMood(item: string) {

  }
}
