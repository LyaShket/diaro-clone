import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IAddCategory, ICategory } from '../../../interfaces/category';
import { serverUrl } from '../../constants/url/url';

@Injectable({
  providedIn: 'root'
})
export class DiaryCategoryService {

  constructor(
    private http: HttpClient
  ) { }

  create(category: IAddCategory) {
    return this.http.post<ICategory>(`${serverUrl}/diary-category`, category);
  }

  getAll() {
    return this.http.get<ICategory[]>(`${serverUrl}/diary-category`);
  }
}
