import { ISearchEntriesQuery } from '../../shared/interfaces/search-entries-query';

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
