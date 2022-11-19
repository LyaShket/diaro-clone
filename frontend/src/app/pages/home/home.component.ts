import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DiaryEntryService} from "../../shared/services/diary-entry.service";
import {IEntry} from "../../interfaces/entry";
import {ActivatedRoute, ActivationEnd, ActivationStart, EventType, Router} from "@angular/router";
import {map, Subject, takeUntil} from "rxjs";
import {filter, first, withLatestFrom} from "rxjs/operators";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  entries: IEntry[] = [];

  constructor(
    private diaryEntryService: DiaryEntryService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getAllEntries();

    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: any) => {
        const categoryQuery = res?.params?.['category'];
        if (!categoryQuery) {
          return;
        }

        this.searchEntries(categoryQuery.split(','));
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  getAllEntries() {
    this.diaryEntryService.getAll().subscribe(res => {
      if (!res || res.length === undefined) {
        return;
      }
      this.entries = res;
      this.cdr.detectChanges();
    });
  }

  searchEntries(categories: string[]) {
    this.diaryEntryService.search(categories).subscribe(res => {
      console.log(res);
      if (!res || res.length === undefined) {
        console.log('return');
        return;
      }
      this.entries = res;
      this.cdr.detectChanges();
    });
  }

}
