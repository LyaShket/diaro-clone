import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IAddCategory, ICategory } from '../../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class DiaryCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  create(category: IAddCategory) {
    return this.http.post<ICategory>('http://localhost:3000/diary-category', category);
  }

  getAll() {
    return this.http.get<ICategory[]>('http://localhost:3000/diary-category');
  }
}
