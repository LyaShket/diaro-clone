import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { ITag } from '../../interfaces/tag';
import { AddTag, LoadTags, LoadTagsComplete, LoadTagsError } from './tag.actions';
import { DiaryTagService } from '../../shared/services/diary-tag.service';

export interface TagStateModel {
  loading: boolean,
  tags: ITag[],
}

export const tagStateDefaults: TagStateModel = {
  loading: true,
  tags: [],
};

@State<TagStateModel>({
  name: 'Tag',
  defaults: tagStateDefaults
})
@Injectable()
export class TagState {
  constructor(private diaryTagService: DiaryTagService) {
  }

  @Selector()
  static getTags(state: TagStateModel) {
    return state.tags;
  }

  @Selector()
  static getLoading(state: TagStateModel) {
    return state.loading;
  }

  @Action(AddTag)
  addTag(
    { getState, patchState }: StateContext<TagStateModel>,
    action: AddTag
  ) {
    const state = getState();

    return this.diaryTagService.create(action.tag).pipe(first()).subscribe(res => {
      patchState({ tags: [...state.tags, res] });
    });
  }

  @Action(LoadTags)
  loadTags(
    { dispatch, patchState }: StateContext<TagStateModel>
  ) {
    patchState({ loading: true });

    return this.diaryTagService.getAll().pipe(
      map(entries => dispatch(new LoadTagsComplete(entries))),
      catchError(err => {
        dispatch(new LoadTagsError(err));

        return of(new LoadTagsError(err));
      })
    );
  }

  @Action(LoadTagsComplete)
  loadTagsComplete(
    { patchState }: StateContext<TagStateModel>,
    action: LoadTagsComplete
  ) {
    patchState({ loading: false, tags: action.tags });
  }

  @Action(LoadTagsError)
  loadTagsError(
    { patchState }: StateContext<TagStateModel>,
    action: LoadTagsError
  ) {
    patchState({ loading: false });
  }

}
