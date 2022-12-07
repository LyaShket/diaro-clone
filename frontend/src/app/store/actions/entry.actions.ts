import { IEntry } from '../../interfaces/entry';
import { ISearchEntriesQuery } from '../../shared/interfaces/search-entries-query';

export class AddEntry {
  static readonly type = '[Entry] Add Entry';
  constructor(public entry: IEntry) {}
}

export class UpdateEntry {
  static readonly type = '[Entry] Update Entry';
  constructor(public entry: IEntry) {}
}

export class SetEntries {
  static readonly type = '[Entry] Set Entries';
  constructor(public entries: IEntry[]) {}
}

export class SetActiveEntry {
  static readonly type = '[Entry] Set Active Entry';
  constructor(public entry: IEntry) {}
}

export class SetEdit {
  static readonly type = '[Entry] Set Edit';
  constructor(public state: boolean) {}
}

export class SearchEntries {
  static readonly type = '[Entry] Search Entries';
  constructor(public query: ISearchEntriesQuery = {}) {}
}

export class SearchComplete {
  static readonly type = '[Entry] Search Complete';
  constructor(public entries: IEntry[]) {}
}

export class SearchError {
  static readonly type = '[Entry] Search Error';
  constructor(public error: any) {}
}

export class LoadActiveEntry {
  static readonly type = '[Entry] Load Active Entry';
  constructor(public id?: string) {}
}

export class LoadActiveEntryComplete {
  static readonly type = '[Entry] Load Active Entry Complete';
  constructor(public entry: IEntry) {}
}

export class LoadActiveEntryError {
  static readonly type = '[Entry] Load Active Entry Error';
  constructor(public error: any) {}
}

