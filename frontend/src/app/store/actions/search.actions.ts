import { ISearchEntriesQuery } from '../../shared/interfaces/search-entries-query';
import { IEntry } from '../../interfaces/entry';
import { ISearchForm } from '../states/search.state';

export class UpdateForm {
  static readonly type = '[Search] Update Form';
  constructor(public form: ISearchForm) {}
}

export class InitValuesFromUrlParams {
  static readonly type = '[Search] Init Values From Url Params';
  constructor(public params: any) {}
}

export class NavigateSearch {
  static readonly type = '[Search] Navigate Search';
}

export class SearchEntries {
  static readonly type = '[Search] Search Entries';
  constructor(public query: ISearchEntriesQuery = {}) {}
}

export class SearchComplete {
  static readonly type = '[Search] Search Complete';
  constructor(public entries: IEntry[]) {}
}

export class SearchError {
  static readonly type = '[Search] Search Error';
  constructor(public error: any) {}
}

export class ClearSearch {
  static readonly type = '[Search] Clear Search';
}
