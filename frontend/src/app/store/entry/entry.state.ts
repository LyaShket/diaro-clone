import { Injectable, NgZone } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  CreateEntry,
  SetActiveEntry,
  SetEdit,
  SetEntries,
  LoadActiveEntry, LoadEntryComplete, LoadEntryError,
  UpdateEntry, SetEntryPublic, LoadPublicEntry, DeleteEntry
} from './entry.actions';
import { IEntry } from '../../interfaces/entry';
import { DiaryEntryService } from '../../shared/services/diary-entry/diary-entry.service';
import { interval, of, tap, timeout } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { SearchState, SearchStateModel } from '../search/search.state';
import { SearchComplete } from '../search/search.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface EntryStateModel {
  loading: boolean
  entries: IEntry[]
  activeEntry: IEntry
  edit: boolean
}

export const entryStateDefaults: EntryStateModel = {
  loading: true,
  entries: [],
  activeEntry: {},
  edit: false,
};

@State<EntryStateModel>({
  name: 'entry',
  defaults: entryStateDefaults,
  children: [SearchState]
})
@Injectable()
export class EntryState {
  constructor(
    private diaryEntryService: DiaryEntryService,
    private router: Router,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
  }

  @Selector()
  static getEntries(state: EntryStateModel) {
    return state.entries;
  }

  @Selector()
  static getEdit(state: EntryStateModel) {
    return state.edit;
  }

  @Selector()
  static getLoading(state: EntryStateModel) {
    return state.loading;
  }

  @Selector()
  static getActiveEntry(state: EntryStateModel) {
    return state.activeEntry;
  }

  @Action(CreateEntry)
  createEntry(
    { getState, patchState, dispatch }: StateContext<EntryStateModel>,
    action: CreateEntry
  ) {
    const state = getState();

    return this.diaryEntryService.create(action.entry).subscribe(res => {
      patchState({ edit: false, entries: [...state.entries, res] });
      dispatch(new SetActiveEntry(res));
    });
  }

  @Action(UpdateEntry)
  updateEntry(
    { getState, patchState, dispatch }: StateContext<EntryStateModel>,
    action: UpdateEntry
  ) {
    const state = getState();

    return this.diaryEntryService.update(action.entry._id, action.entry)
      .pipe(map(entry => {
        patchState({ edit: false, entries: state.entries.map(i => i._id === entry._id ? entry : i) });
        dispatch(new SetActiveEntry(entry));
      }));
  }

  @Action(SetEntries)
  setEntries(
    { patchState }: StateContext<EntryStateModel>,
    action: SetEntries
  ) {
    patchState({ entries: action.entries });
  }

  @Action(SetActiveEntry)
  setActiveEntry(
    { patchState }: StateContext<EntryStateModel>,
    action: SetActiveEntry
  ) {
    patchState({ activeEntry: action.entry });
  }

  @Action(SetEdit)
  setEdit(
    { patchState }: StateContext<EntryStateModel>,
    action: SetEdit
  ) {
    patchState({ edit: action.state });
  }

  @Action(SearchComplete)
  searchComplete(
    { patchState }: StateContext<EntryStateModel>,
    action: SearchComplete
  ) {
    patchState({
      entries: action.entries,
      loading: false
    });
  }

  @Action(LoadActiveEntry)
  loadActiveEntry(
    { dispatch, patchState }: StateContext<EntryStateModel>,
    action: LoadActiveEntry
  ) {
    patchState({
      edit: false,
      loading: true
    });

    return this.diaryEntryService.get(action._id).pipe(
      map(entry => dispatch(new LoadEntryComplete(entry))),
      catchError(err => {
        dispatch(new LoadEntryError(err));

        return of(new LoadEntryError(err));
      })
    );
  }

  @Action(LoadPublicEntry)
  loadPublicEntry(
    { dispatch, patchState }: StateContext<EntryStateModel>,
    action: LoadPublicEntry
  ) {
    patchState({
      edit: false,
      loading: true
    });

    return this.diaryEntryService.getPublic(action._id).pipe(
      map(entry => dispatch(new LoadEntryComplete(entry))),
      catchError(err => {
        dispatch(new LoadEntryError(err));

        return of(new LoadEntryError(err));
      })
    );
  }

  @Action(LoadEntryComplete)
  loadActiveEntryComplete(
    { patchState }: StateContext<EntryStateModel>,
    action: LoadEntryComplete
  ) {
    patchState({
      edit: false,
      loading: false,
      activeEntry: action.entry,
    });
  }

  @Action(LoadEntryError)
  loadActiveEntryError(
    { patchState }: StateContext<EntryStateModel>,
    action: LoadEntryError
  ) {
    patchState({
      edit: false,
      loading: false
    });
  }


  @Action(SetEntryPublic)
  setEntryPublic(
    { patchState, getState, dispatch }: StateContext<EntryStateModel>,
    action: SetEntryPublic
  ) {
    const state = getState();
    patchState({
      entries: state.entries.map(i => {
        if (i._id === action._id) {
          return { ...i, public: action.entryPublic };
        }
        return i;
      }),
      activeEntry: {
        ...state.activeEntry,
        public: action.entryPublic
      }
    });
    dispatch(new UpdateEntry({ _id: action._id, public: action.entryPublic }));
  }

  @Action(DeleteEntry)
  deleteEntry(
    { patchState, getState, dispatch }: StateContext<EntryStateModel>,
    action: DeleteEntry
  ) {
    const state = getState();
    patchState({
      entries: state.entries.filter(i => i._id !== action._id),
      activeEntry: {}
    });

    this.ngZone.run(() => {
      this.router.navigate(['/']);
    });

    return this.diaryEntryService.delete(action._id).pipe(tap(() => {
      this.toastr.success('Entry deleted');
    }));
  }

}
