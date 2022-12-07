import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  AddEntry, SearchComplete, SearchEntries, SearchError,
  SetActiveEntry,
  SetEdit,
  SetEntries,
  LoadActiveEntry, LoadActiveEntryComplete, LoadActiveEntryError,
  UpdateEntry
} from '../actions/entry.actions';
import { IEntry } from '../../interfaces/entry';
import { DiaryEntryService } from '../../shared/services/diary-entry.service';
import { of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface EntryStateModel {
  loaded: boolean,
  loading: boolean,
  entries: IEntry[],
  activeEntry: IEntry,
  edit: boolean,
}

export const entryStateDefaults: EntryStateModel = {
  loaded: false,
  loading: true,
  entries: [],
  activeEntry: {},
  edit: false,
};

@State<EntryStateModel>({
  name: 'entry',
  defaults: entryStateDefaults
})
@Injectable()
export class EntryState {
  constructor(private diaryEntryService: DiaryEntryService) {
  }

  @Selector()
  static getEntries(state: EntryStateModel) {
    return state.entries;
  }

  @Selector()
  static getLoaded(state: EntryStateModel) {
    return state.loaded;
  }

  @Selector()
  static getLoading(state: EntryStateModel) {
    return state.loading;
  }

  @Selector()
  static getEdit(state: EntryStateModel) {
    return state.edit;
  }

  @Selector()
  static getActiveEntry(state: EntryStateModel) {
    return state.activeEntry;
  }

  @Action(AddEntry)
  addEntry(
    { getState, patchState }: StateContext<EntryStateModel>,
    action: AddEntry
  ) {
    const state = getState();
    patchState({ entries: [...state.entries, action.entry] });

    return this.diaryEntryService.create(action.entry);
  }

  @Action(UpdateEntry)
  updateEntry(
    { getState, patchState }: StateContext<EntryStateModel>,
    action: UpdateEntry
  ) {
    const state = getState();
    patchState({ entries: state.entries.map(i => i.id === action.entry.id ? action.entry : i) });

    return this.diaryEntryService.create(action.entry);
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

  @Action(SearchEntries)
  searchEntries(
    { dispatch, patchState }: StateContext<EntryStateModel>,
    action: SearchEntries
  ) {
    patchState({
      loading: true,
      loaded: false
    });

    return this.diaryEntryService.search(action.query).pipe(
      map(entries => dispatch(new SearchComplete(entries))),
      catchError(err => {
        dispatch(new SearchError(err));

        return of(new SearchError(err));
      })
    );
  }

  @Action(SearchComplete)
  searchComplete(
    { patchState }: StateContext<EntryStateModel>,
    action: SearchComplete
  ) {
    patchState({
      loaded: true,
      loading: false,
      entries: action.entries
    });
  }

  @Action(SearchError)
  searchError(
    { patchState }: StateContext<EntryStateModel>,
    action: SearchError
  ) {
    patchState({
      loaded: true,
      loading: false,
    });
  }

  @Action(LoadActiveEntry)
  loadActiveEntry(
    { dispatch, patchState }: StateContext<EntryStateModel>,
    action: LoadActiveEntry
  ) {
    patchState({
      loaded: false,
      loading: true,
      edit: false,
    });

    return this.diaryEntryService.get(action.id).pipe(
      map(entry => dispatch(new LoadActiveEntryComplete(entry))),
      catchError(err => {
        dispatch(new LoadActiveEntryError(err));

        return of(new LoadActiveEntryError(err));
      })
    );
  }

  @Action(LoadActiveEntryComplete)
  loadActiveEntryComplete(
    { patchState }: StateContext<EntryStateModel>,
    action: LoadActiveEntryComplete
  ) {
    patchState({
      loaded: true,
      loading: false,
      edit: false,
      activeEntry: action.entry,
    });
  }

  @Action(LoadActiveEntryError)
  loadActiveEntryError(
    { patchState }: StateContext<EntryStateModel>,
    action: LoadActiveEntryError
  ) {
    patchState({
      loaded: true,
      loading: false,
      edit: false,
    });
  }


}
