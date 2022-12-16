import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  AddEntry,
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
import { SearchState, SearchStateModel } from './search.state';
import { SearchComplete } from '../actions/search.actions';

export interface EntryStateModel {
  entries: IEntry[],
  activeEntry: IEntry,
  edit: boolean,
}

export const entryStateDefaults: EntryStateModel = {
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
  constructor(private diaryEntryService: DiaryEntryService) {
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

  @Action(SearchComplete)
  searchComplete(
    { patchState }: StateContext<EntryStateModel>,
    action: SearchComplete
  ) {
    patchState({
      entries: action.entries
    });
  }

  @Action(LoadActiveEntry)
  loadActiveEntry(
    { dispatch, patchState }: StateContext<EntryStateModel>,
    action: LoadActiveEntry
  ) {
    patchState({
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
      edit: false,
    });
  }


}
