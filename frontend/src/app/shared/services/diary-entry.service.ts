import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEntry} from "../../interfaces/entry";
import {ISearchEntriesQuery} from "../interfaces/search-entries-query";
import {queryToHttpParams} from "../../utils/converters";
import {IQuery} from "../interfaces/query";

@Injectable({
  providedIn: 'root'
})
export class DiaryEntryService {

  constructor(
    private http: HttpClient
  ) { }

  create(entry: IEntry) {
    return this.http.post('http://localhost:3000/diary-entry', entry);
  }

  getAll() {
    return this.http.get<IEntry[]>('http://localhost:3000/diary-entry');
  }

  search(query: ISearchEntriesQuery) {
    const params = queryToHttpParams(query);
    return this.http.get<IEntry[]>(`http://localhost:3000/diary-entry/search`, { params });
  }

  get(id: string) {
    return this.http.get<IEntry>('http://localhost:3000/diary-entry/' + id);
  }
}
