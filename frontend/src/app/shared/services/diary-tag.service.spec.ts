import { TestBed } from '@angular/core/testing';

import { DiaryTagService } from './diary-tag.service';

describe('DiaryTagService', () => {
  let service: DiaryTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
