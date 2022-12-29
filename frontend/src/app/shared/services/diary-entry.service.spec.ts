import { TestBed } from '@angular/core/testing';

import { DiaryEntryService } from './diary-entry.service';
import { HttpClient } from '@angular/common/http';

class MockService {}

describe('DiaryEntryService', () => {
  let service: DiaryEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockService }
      ]
    });
    service = TestBed.inject(DiaryEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
