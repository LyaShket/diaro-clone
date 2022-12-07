import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DiaryCategoryService } from '../../shared/services/diary-category.service';
import { ICategory } from '../../interfaces/category';
import { AddCategory, LoadCategories, LoadCategoriesComplete, LoadCategoriesError } from '../actions/category.actions';

export interface CategoryStateModel {
  loading: boolean,
  categories: ICategory[],
}

export const categoryStateDefaults: CategoryStateModel = {
  loading: true,
  categories: [],
};

@State<CategoryStateModel>({
  name: 'category',
  defaults: categoryStateDefaults
})
@Injectable()
export class CategoryState {
  constructor(private diaryCategoryService: DiaryCategoryService) {
  }

  @Selector()
  static getCategories(state: CategoryStateModel) {
    return state.categories;
  }

  @Selector()
  static getLoading(state: CategoryStateModel) {
    return state.loading;
  }

  @Action(AddCategory)
  addCategory(
    { getState, patchState }: StateContext<CategoryStateModel>,
    action: AddCategory
  ) {
    const state = getState();
    patchState({ categories: [...state.categories, action.category] });

    return this.diaryCategoryService.create(action.category);
  }

  @Action(LoadCategories)
  loadCategories(
    { dispatch, patchState }: StateContext<CategoryStateModel>
  ) {
    patchState({ loading: true });

    return this.diaryCategoryService.getAll().pipe(
      map(entries => dispatch(new LoadCategoriesComplete(entries))),
      catchError(err => {
        dispatch(new LoadCategoriesError(err));

        return of(new LoadCategoriesError(err));
      })
    );
  }

  @Action(LoadCategoriesComplete)
  loadCategoriesComplete(
    { patchState }: StateContext<CategoryStateModel>,
    action: LoadCategoriesComplete
  ) {
    patchState({ loading: false, categories: action.categories });
  }

  @Action(LoadCategoriesError)
  loadCategoriesError(
    { patchState }: StateContext<CategoryStateModel>,
    action: LoadCategoriesError
  ) {
    patchState({ loading: false });
  }

}
