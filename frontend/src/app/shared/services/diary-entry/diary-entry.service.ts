import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEntry } from '../../../interfaces/entry';
import { ISearchEntriesQuery } from '../../interfaces/search-entries-query';
import { queryToHttpParams } from '../../../utils/converters';
import { first } from 'rxjs/operators';
import { serverUrl } from '../../constants/url/url';

@Injectable({
  providedIn: 'root'
})
export class DiaryEntryService {
  constructor(
    private http: HttpClient,
  ) {
  }

  create(entry: IEntry) {
    return this.http.post<IEntry>(`${serverUrl}/diary-entry`, entry).pipe(first());
  }

  update(id: string, entry: IEntry) {
    return this.http.put<IEntry>(`${serverUrl}/diary-entry/${id}`, entry).pipe(first());
  }

  getAll() {
    return this.http.get<IEntry[]>(`${serverUrl}/diary-entry`).pipe(first());
  }

  search(query: ISearchEntriesQuery) {
    const params = queryToHttpParams(query);
    return this.http.get<IEntry[]>(`${serverUrl}/diary-entry/search`, { params }).pipe(first());
  }

  get(id: string) {
    return this.http.get<IEntry>(`${serverUrl}/diary-entry/${id}`).pipe(first());
  }

  getPublic(id: string) {
    return this.http.get<IEntry>(`${serverUrl}/diary-entry/public/${id}`).pipe(first());
  }

  delete(id: string) {
    return this.http.delete(`${serverUrl}/diary-entry/${id}`).pipe(first());
  }
}
