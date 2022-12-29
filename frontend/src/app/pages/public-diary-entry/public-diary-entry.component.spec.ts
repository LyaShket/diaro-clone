import { TestBed } from '@angular/core/testing';

import { PublicDiaryEntryComponent } from './public-diary-entry.component';

class MockService {}

class MockStore {
  dispatch() {}
}

describe('PublicDiaryEntryComponent', () => {
  let component: PublicDiaryEntryComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicDiaryEntryComponent,
        // { provide: DiaryEntryService, useClass: MockService },
        // { provide: Store, useClass: MockStore },
      ],
    });

    component = TestBed.inject(PublicDiaryEntryComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
