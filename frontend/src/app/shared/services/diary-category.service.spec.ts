import { TestBed } from '@angular/core/testing';

import { DiaryCategoryService } from './diary-category.service';
import { HttpClient } from '@angular/common/http';

class MockService {}

describe('DiaryCategoryService', () => {
  let service: DiaryCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockService }
      ]
    });
    service = TestBed.inject(DiaryCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
