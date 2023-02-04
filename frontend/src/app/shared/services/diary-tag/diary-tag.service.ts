import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IAddTag, ITag } from '../../../interfaces/tag';

@Injectable({
  providedIn: 'root'
})
export class DiaryTagService {

  constructor(
    private http: HttpClient
  ) {
  }

  create(tag: IAddTag) {
    return this.http.post<ITag>('http://localhost:3000/diary-tag', tag);
  }

  getAll() {
    return this.http.get<ITag[]>('http://localhost:3000/diary-tag');
  }
}
