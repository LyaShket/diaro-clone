import { IAddTag, ITag } from '../../../interfaces/tag';
import { Observable, of } from 'rxjs';

export class DiaryTagServiceStub {
  create(tag: IAddTag): Observable<ITag> {
    return of({ _id: '1', name: tag.name });
  }

  getAll(): Observable<ITag[]> {
    return of([{ _id: '1', name: 'Test Category' }]);
  }
}
