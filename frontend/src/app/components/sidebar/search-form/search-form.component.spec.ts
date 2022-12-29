import { TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { Store } from '@ngxs/store';

class MockService {}

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        SearchFormComponent,
        { provide: Store, useClass: MockService },
      ],
    });

    component = TestBed.inject(SearchFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
