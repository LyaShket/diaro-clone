import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEntry} from "../../interfaces/entry";

@Injectable({
  providedIn: 'root'
})
export class DiaryCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  create(category: string) {
    return this.http.post('http://localhost:3000/diary-category', { category });
  }

  getAll() {
    return this.http.get<IEntry[]>('http://localhost:3000/diary-category');
  }
}
