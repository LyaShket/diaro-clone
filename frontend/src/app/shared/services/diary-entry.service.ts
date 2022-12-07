import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEntry } from '../../interfaces/entry';
import { ISearchEntriesQuery } from '../interfaces/search-entries-query';
import { queryToHttpParams } from '../../utils/converters';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiaryEntryService {
  clearFilters$ = new Subject();

  constructor(
    private http: HttpClient,
    private store: Store
  ) {
  }

  create(entry: IEntry) {
    return this.http.post('http://localhost:3000/diary-entry', entry).pipe(first());
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
}
