import { Injectable, NgZone } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DiaryEntryService } from '../../shared/services/diary-entry.service';
import {
  ClearSearch,
  InitValuesFromUrlParams, NavigateSearch, SearchComplete, SearchEntries, SearchError,
  UpdateForm
} from '../actions/search.actions';
import { Router } from '@angular/router';
import { ISearchEntriesQuery } from '../../shared/interfaces/search-entries-query';

export interface ISearchForm {
  categories: string[]
  tags: string[]
  moods: string[]
  timeFrom: string
  timeTo: string
  text: string
}

export interface SearchStateModel {
  loading: boolean
  form: ISearchForm
}

export const searchStateDefaults: SearchStateModel = {
  loading: true,
  form: {
    categories: [],
    tags: [],
    moods: [],
    timeFrom: '',
    timeTo: '',
    text: '',
  }
};

@State<SearchStateModel>({
  name: 'Search',
  defaults: searchStateDefaults
})
@Injectable()
export class SearchState {
  constructor(
    private readonly diaryEntryService: DiaryEntryService,
    private readonly router: Router,
    private readonly ngZone: NgZone,
  ) {
  }

  @Selector()
  static getLoading(state: SearchStateModel) {
    return state.loading;
  }

  @Selector()
  static getForm(state: SearchStateModel): ISearchForm {
    return state.form;
  }

  @Action(UpdateForm)
  updateForm(
    { patchState }: StateContext<SearchStateModel>,
    action: UpdateForm
  ) {
    patchState({ form: action.form })
  }

  @Action(InitValuesFromUrlParams)
  initValuesFromUrlParams(
    { patchState }: StateContext<SearchStateModel>,
    action: InitValuesFromUrlParams
  ) {
    const timeFrom = action.params?.timeFrom;
    const timeTo = action.params?.timeTo;

    patchState({
      form: {
        categories: action.params?.category?.split(',') || [],
        tags: action.params?.tag?.split(',') || [],
        moods: action.params?.mood?.split(',') || [],
        text: action.params?.text || '',
        timeFrom: timeFrom ? new Date(+timeFrom).toJSON() : '',
        timeTo: timeTo ? new Date(+timeTo).toJSON() : '',
      }
    });
  }

  @Action(NavigateSearch)
  navigateSearch({ getState }: StateContext<SearchStateModel>) {
    const form = getState().form;

    if (!form.categories.length && !form.tags.length && !form.moods.length && !form.timeFrom && !form.timeTo && !form.text) {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
      return;
    }

    const queryParams: ISearchEntriesQuery = {};
    if (form.categories.length > 0) {
      queryParams.category = form.categories.join(',');
    }
    if (form.tags.length > 0) {
      queryParams.tag = form.tags.join(',');
    }
    if (form.moods.length > 0) {
      queryParams.mood = form.moods.join(',');
    }
    if (form.timeFrom) {
      queryParams.timeFrom = new Date(form.timeFrom).getTime().toString();
    }
    if (form.timeTo) {
      queryParams.timeTo = new Date(form.timeTo).getTime().toString();
    }
    if (form.text) {
      queryParams.text = form.text;
    }

    this.ngZone.run(() => {
      this.router.navigate(['/search'], { queryParams });
    });
  }

  @Action(SearchEntries)
  searchEntries(
    { dispatch, patchState }: StateContext<SearchStateModel>,
    action: SearchEntries
  ) {
    patchState({
      loading: true
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
  searchComplete({ patchState }: StateContext<SearchStateModel>) {
    patchState({
      loading: false,
    });
  }

  @Action(SearchError)
  searchError(
    { patchState }: StateContext<SearchStateModel>,
    action: SearchError
  ) {
    patchState({
      loading: false,
    });
  }

  @Action(ClearSearch)
  clearSearch(
    { patchState, dispatch }: StateContext<SearchStateModel>
  ) {
    patchState({
      form: {
        categories: [],
        tags: [],
        moods: [],
        timeFrom: '',
        timeTo: '',
        text: '',
      }
    });

    dispatch(new NavigateSearch());
  }
}
