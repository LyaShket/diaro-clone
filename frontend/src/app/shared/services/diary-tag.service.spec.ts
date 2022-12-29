import { TestBed } from '@angular/core/testing';

import { DiaryTagService } from './diary-tag.service';
import { HttpClient } from '@angular/common/http';

class MockService {}

describe('DiaryTagService', () => {
  let service: DiaryTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockService }
      ]
    });
    service = TestBed.inject(DiaryTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
