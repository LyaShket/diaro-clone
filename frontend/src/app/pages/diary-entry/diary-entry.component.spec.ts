import { TestBed } from '@angular/core/testing';

import { DiaryEntryComponent } from './diary-entry.component';
import { DiaryCategoryService } from '../../shared/services/diary-category.service';
import { DiaryTagService } from '../../shared/services/diary-tag.service';
import { DiaryEntryService } from '../../shared/services/diary-entry.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';

class MockService {}

class MockStore {
  dispatch() {}
}

describe('DiaryEntryComponent', () => {
  let component: DiaryEntryComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DiaryEntryComponent,
        { provide: DiaryEntryService, useClass: MockService },
        { provide: DiaryTagService, useClass: MockService },
        { provide: DiaryCategoryService, useClass: MockService },
        { provide: ActivatedRoute, useClass: MockService },
        { provide: Store, useClass: MockStore },
        { provide: ToastrService, useClass: MockService },
      ],
    });

    component = TestBed.inject(DiaryEntryComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
