import { IAddCategory, ICategory } from '../../interfaces/category';

export class AddCategory {
  static readonly type = '[Category] Add Category';
  constructor(public category: IAddCategory) {}
}

export class LoadCategories {
  static readonly type = '[Category] Load Categories';
}

export class LoadCategoriesComplete {
  static readonly type = '[Category] Load Categories Complete';
  constructor(public categories: ICategory[]) {}
}

export class LoadCategoriesError {
  static readonly type = '[Category] Load Categories Error';
  constructor(public error: any) {}
}
