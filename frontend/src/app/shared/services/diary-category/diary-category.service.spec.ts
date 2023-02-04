import { TestBed } from '@angular/core/testing';

import { DiaryCategoryService } from './diary-category.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

class MockService {
  get = () => of({});
  post = () => of({});
}

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

  it('should create a category', () => {
    expect(service.create({ 'name': 'test' })).toBeTruthy();
  });

  it('should get all categories', () => {
    expect(service.getAll()).toBeTruthy();
  });

});
