import { ISearchEntriesQuery } from '../../shared/interfaces/search-entries-query';
import { IEntry } from '../../interfaces/entry';

export class SelectCategory {
  static readonly type = '[Search] Select Category';
  constructor(public category: string) {}
}

export class SelectTag {
  static readonly type = '[Search] Select Tag';
  constructor(public tag: string) {}
}

export class SelectMood {
  static readonly type = '[Search] Select Mood';
  constructor(public mood: string) {}
}

export class SetTimeFrom {
  static readonly type = '[Search] Set Time From';
  constructor(public timeFrom: string) {}
}

export class SetTimeTo {
  static readonly type = '[Search] Set Time To';
  constructor(public timeTo: string) {}
}

export class SetText {
  static readonly type = '[Search] Set Text';
  constructor(public text: string) {}
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
