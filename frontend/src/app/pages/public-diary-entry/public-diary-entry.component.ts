import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EntryState } from '../../store/states/entry.state';
import { Observable } from 'rxjs';
import { IEntry } from '../../interfaces/entry';
import { ActivatedRoute } from '@angular/router';
import { LoadPublicEntry, SetActiveEntry } from '../../store/actions/entry.actions';

@Component({
  selector: 'app-public-diary-entry',
  templateUrl: './public-diary-entry.component.html',
  styleUrls: ['./public-diary-entry.component.scss']
})
export class PublicDiaryEntryComponent implements OnInit, OnDestroy {
  @Select(EntryState.getActiveEntry) entry$: Observable<IEntry>;
  @Select(EntryState.getLoading) loading$: Observable<boolean>;
  @Select(EntryState.getEdit) edit$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (!routeId) {
      return;
    }

    this.store.dispatch(new LoadPublicEntry(routeId));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetActiveEntry({}));
  }

}
