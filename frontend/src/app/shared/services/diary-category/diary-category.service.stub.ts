import { of, Observable } from 'rxjs';
import { IAddCategory, ICategory } from '../../../interfaces/category';

export class DiaryCategoryServiceStub {
  create(category: IAddCategory): Observable<ICategory> {
    return of({ _id: '1', name: category.name });
  }

  getAll(): Observable<ICategory[]> {
    return of([{ _id: '1', name: 'Test Category' }]);
  }
}
