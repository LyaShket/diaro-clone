import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEntry} from "../../interfaces/entry";

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

  search(categories: string[]) {
    return this.http.get<IEntry[]>(`http://localhost:3000/diary-entry/search?category=${categories.join(',')}`);
  }

  get(id: string) {
    return this.http.get<IEntry>('http://localhost:3000/diary-entry/' + id);
  }
}
