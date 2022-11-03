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

  create(entry: any) {
    return this.http.post('http://localhost:3000/diary-entry', entry);
  }

  getAll() {
    return this.http.get<IEntry[]>('http://localhost:3000/diary-entry');
  }

  get(id: string) {
    return this.http.get<IEntry>('http://localhost:3000/diary-entry/' + id);
  }
}
