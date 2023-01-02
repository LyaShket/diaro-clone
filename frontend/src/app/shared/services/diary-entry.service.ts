import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEntry } from '../../interfaces/entry';
import { ISearchEntriesQuery } from '../interfaces/search-entries-query';
import { queryToHttpParams } from '../../utils/converters';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiaryEntryService {
  constructor(
    private http: HttpClient,
  ) {
  }

  create(entry: IEntry) {
    return this.http.post<IEntry>('http://localhost:3000/diary-entry', entry).pipe(first());
  }

  update(id: string, entry: IEntry) {
    return this.http.put<IEntry>('http://localhost:3000/diary-entry/' + id, entry).pipe(first());
  }

  getAll() {
    return this.http.get<IEntry[]>('http://localhost:3000/diary-entry').pipe(first());
  }

  search(query: ISearchEntriesQuery) {
    const params = queryToHttpParams(query);
    return this.http.get<IEntry[]>(`http://localhost:3000/diary-entry/search`, { params }).pipe(first());
  }

  get(id: string) {
    return this.http.get<IEntry>('http://localhost:3000/diary-entry/' + id).pipe(first());
  }

  getPublic(id: string) {
    return this.http.get<IEntry>('http://localhost:3000/diary-entry/public/' + id).pipe(first());
  }

  delete(id: string) {
    return this.http.delete('http://localhost:3000/diary-entry/' + id).pipe(first());
  }
}
