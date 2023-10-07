import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IAddTag, ITag } from '../../../interfaces/tag';
import { serverUrl } from '../../constants/url/url';

@Injectable({
  providedIn: 'root'
})
export class DiaryTagService {

  constructor(
    private http: HttpClient
  ) {
  }

  create(tag: IAddTag) {
    return this.http.post<ITag>(`${serverUrl}/diary-tag`, tag);
  }

  getAll() {
    return this.http.get<ITag[]>(`${serverUrl}/diary-tag`);
  }
}
