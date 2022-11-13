import { TestBed } from '@angular/core/testing';

import { DiaryCategoryService } from './diary-category.service';

describe('DiaryCategoryService', () => {
  let service: DiaryCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
