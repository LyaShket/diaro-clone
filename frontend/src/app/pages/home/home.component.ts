import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DiaryEntryService } from '../../shared/services/diary-entry.service';
import { IEntry } from '../../interfaces/entry';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, of } from 'rxjs';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { EntryState } from '../../store/states/entry.state';
import { ClearSearch, SearchEntries } from '../../store/actions/search.actions';
import { SearchState } from '../../store/states/search.state';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(EntryState.getEntries) entries$: Observable<IEntry[]>;
  @Select(SearchState.getLoading) loading$: Observable<boolean>;

  showFilteredList = false;

  private destroyed$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {}

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
          this.store.dispatch(new SearchEntries());
          return;
        }

        this.showFilteredList = true;
        this.store.dispatch(new SearchEntries(res.params));
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  clearFilters() {
    this.store.dispatch(new ClearSearch());
  }
}
