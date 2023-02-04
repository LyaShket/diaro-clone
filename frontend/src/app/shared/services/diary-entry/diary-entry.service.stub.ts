import { IEntry } from '../../../interfaces/entry';
import { of } from 'rxjs';
import { ISearchEntriesQuery } from '../../interfaces/search-entries-query';

const testEntry: IEntry = {
  _id: '123456789',
  title: 'Test Entry',
  author: 'John Doe',
  body: 'This is the body of the test entry',
  text: 'This is the text of the test entry',
  tags: [{ _id: '1', name: 'Test Tag 1' }, { _id: '2', name: 'Test Tag 2' }],
  category: { _id: '1', name: 'Test Category' },
  mood: 'happy',
  public: true,
  created: 16123456789,
  updated: 16123456799
};

export class DiaryEntryServiceStub {
  create(entry: IEntry) {
    return of(entry);
  }

  update(id: string, entry: IEntry) {
    return of(entry);
  }

  getAll() {
    return of([{ ...testEntry }]);
  }

  search(query: ISearchEntriesQuery) {
    return of([] as IEntry[]);
  }

  get(id: string) {
    return of({ ...testEntry, _id: id });
  }

  getPublic(id: string) {
    return of({ ...testEntry, _id: id, public: true });
  }

  delete(id: string) {
    return of(null);
  }
}
