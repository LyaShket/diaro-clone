import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DiaryEntryService } from '../../shared/services/diary-entry.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';

class MockService {}

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeComponent,
        { provide: DiaryEntryService, useClass: MockService },
        { provide: ActivatedRoute, useClass: MockService },
        { provide: Store, useClass: MockService },
      ],
    });

    component = TestBed.inject(HomeComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
