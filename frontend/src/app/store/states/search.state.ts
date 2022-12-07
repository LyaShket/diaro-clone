import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DiaryEntryService } from '../../shared/services/diary-entry.service';
import {
  InitValuesFromUrlParams, NavigateSearch,
  SelectCategory,
  SelectMood,
  SelectTag,
  SetText,
  SetTimeFrom,
  SetTimeTo
} from '../actions/search.actions';
import { Router } from '@angular/router';
import { ISearchEntriesQuery } from '../../shared/interfaces/search-entries-query';

export interface SearchStateModel {
  categories: string[],
  tags: string[],
  moods: string[],
  timeFrom: string,
  timeTo: string,
  text: string,
}

export const searchStateDefaults: SearchStateModel = {
  categories: [],
  tags: [],
  moods: [],
  timeFrom: '',
  timeTo: '',
  text: '',
};

@State<SearchStateModel>({
  name: 'Search',
  defaults: searchStateDefaults
})
@Injectable()
export class SearchState {
  constructor(
    private diaryEntryService: DiaryEntryService,
    private readonly router: Router
  ) {}

  @Selector()
  static getCategories(state: SearchStateModel) {
    return state.categories;
  }

  @Selector()
  static getTags(state: SearchStateModel) {
    return state.tags;
  }

  @Selector()
  static getMoods(state: SearchStateModel) {
    return state.moods;
  }

  @Selector()
  static getTimeFrom(state: SearchStateModel) {
    return state.timeFrom;
  }

  @Selector()
  static getTimeTo(state: SearchStateModel) {
    return state.timeTo;
  }

  @Selector()
  static getText(state: SearchStateModel) {
    return state.text;
  }

  @Action(SelectCategory)
  selectCategory(
    { getState, patchState }: StateContext<SearchStateModel>,
    action: SelectCategory
  ) {
    const state = getState();
    if (state.categories.indexOf(action.category) > -1) {
      patchState({ categories: state.categories.filter(i => i !== action.category) });
    } else {
      patchState({ categories: [...state.categories, action.category] });
    }
  }

  @Action(SelectTag)
  selectTag(
    { getState, patchState }: StateContext<SearchStateModel>,
    action: SelectTag
  ) {
    const state = getState();
    if (state.tags.indexOf(action.tag) > -1) {
      patchState({ tags: state.tags.filter(i => i !== action.tag) });
    } else {
      patchState({ tags: [...state.tags, action.tag] });
    }
  }

  @Action(SelectMood)
  selectMood(
    { getState, patchState }: StateContext<SearchStateModel>,
    action: SelectMood
  ) {
    const state = getState();
    if (state.moods.indexOf(action.mood) > -1) {
      patchState({ moods: state.moods.filter(i => i !== action.mood) });
    } else {
      patchState({ moods: [...state.moods, action.mood] });
    }
  }

  @Action(SetTimeFrom)
  setTimeFrom(
    { patchState }: StateContext<SearchStateModel>,
    action: SetTimeFrom
  ) {
    patchState({ timeFrom: action.timeFrom });
  }

  @Action(SetTimeTo)
  setTimeTo(
    { patchState }: StateContext<SearchStateModel>,
    action: SetTimeTo
  ) {
    patchState({ timeTo: action.timeTo });
  }

  @Action(SetText)
  setText(
    { patchState }: StateContext<SearchStateModel>,
    action: SetText
  ) {
    patchState({ text: action.text });
  }

  @Action(InitValuesFromUrlParams)
  initValuesFromUrlParams(
    { patchState }: StateContext<SearchStateModel>,
    action: InitValuesFromUrlParams
  ) {
    patchState({
      categories: action.params?.category?.split(',') || [],
      tags: action.params?.tag?.split(',') || [],
      moods: action.params?.mood?.split(',') || [],
      text: action.params?.text || '',
    });

    const timeFrom = action.params?.timeFrom;
    if (timeFrom) {
      patchState({ timeFrom: new Date(+timeFrom).toJSON() });
    }

    const timeTo = action.params?.timeTo;
    if (timeTo) {
      patchState({ timeTo: new Date(+timeTo).toJSON() });
    }
  }

  @Action(NavigateSearch)
  navigateSearch({ getState }: StateContext<SearchStateModel>) {
    const state = getState();

    if (!state.categories.length && !state.tags.length && !state.moods.length && !state.timeFrom && !state.timeTo && !state.text) {
      this.router.navigate(['/']);
      return;
    }

    const queryParams: ISearchEntriesQuery = {};
    if (state.categories.length > 0) {
      queryParams.category = state.categories.join(',');
    }
    if (state.tags.length > 0) {
      queryParams.tag = state.tags.join(',');
    }
    if (state.moods.length > 0) {
      queryParams.mood = state.moods.join(',');
    }
    if (state.timeFrom) {
      queryParams.timeFrom = new Date(state.timeFrom).getTime().toString();
    }
    if (state.timeTo) {
      queryParams.timeTo = new Date(state.timeTo).getTime().toString();
    }
    if (state.text) {
      queryParams.text = state.text;
    }

    this.router.navigate(['/search'], { queryParams });
  }
}
