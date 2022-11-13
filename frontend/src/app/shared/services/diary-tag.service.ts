import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITag} from "../../interfaces/tag";
import uniqid from 'uniqid';

@Injectable({
  providedIn: 'root'
})
export class DiaryTagService {

  constructor(
    private http: HttpClient
  ) {
  }

  create(tag: ITag) {
    return this.http.post('http://localhost:3000/diary-tag', tag);
  }

  getAll() {
    return this.http.get<ITag[]>('http://localhost:3000/diary-tag');
  }
}
