import {ISearchEntriesQuery} from "./search-entries-query";

export type IQuery = ISearchEntriesQuery | { [param: string]: string };
