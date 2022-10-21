import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiaryEntryService {

  constructor(
    private http: HttpClient
  ) { }

  create(entry: any) {
    return this.http.post('http://localhost:3000/diary-entry', entry).toPromise();
  }

  getAll() {
    return this.http.get<any[]>('http://localhost:3000/diary-entry').toPromise();
  }
}
