import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
import {IEntry} from "../../interfaces/entry";
import {ActivatedRoute, ActivationEnd, ActivationStart, EventType, Router} from "@angular/router";
import {map, Subject, takeUntil, of} from "rxjs";
import {buffer, filter, finalize, first, tap, withLatestFrom} from "rxjs/operators";
import {firstValueFrom} from "rxjs";
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

  trackById = (index: number, item: any) => item.id;

  loading = true;

  constructor(
    private diaryEntryService: DiaryEntryService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: any) => {
        const categoryQuery = res?.params?.category;
        const tagQuery = res?.params?.tag;
        if (!categoryQuery && !tagQuery) {
          this.getAllEntries();
          return;
        }

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
