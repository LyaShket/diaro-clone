import {Component, OnDestroy, OnInit} from '@angular/core';
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
import {IEntry} from "../../interfaces/entry";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil, of} from "rxjs";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {ISearchEntriesQuery} from "../../shared/interfaces/search-entries-query";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  entries$: Observable<IEntry[]> = new Subject();

  loading = true;
  showFilteredList = false;

  constructor(
    private diaryEntryService: DiaryEntryService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: any) => {
        const categoryQuery = res?.params?.category;
        const tagQuery = res?.params?.tag;
        const moodQuery = res?.params?.mood;
        const timeFromQuery = res?.params?.timeFrom;
        const timeToQuery = res?.params?.timeTo;
        const text = res?.params?.text;
        if (!categoryQuery && !tagQuery && !moodQuery && !timeFromQuery && !timeToQuery && !text) {
          this.showFilteredList = false;
          this.getAllEntries();
          return;
        }

        this.showFilteredList = true;
        this.searchEntries(res.params);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  getAllEntries() {
    this.loading = true;
    this.entries$ = this.diaryEntryService.getAll().pipe(finalize(() => this.loading = false));
  }

  searchEntries(query: ISearchEntriesQuery) {
    this.loading = true;
    this.entries$ = this.diaryEntryService.search(query).pipe(finalize(() => this.loading = false));
  }

}
