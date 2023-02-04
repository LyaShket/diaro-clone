import { TestBed } from '@angular/core/testing';

import { DiaryTagService } from './diary-tag.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

class MockService {
  get = () => of({});
  post = () => of({});
}

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

  it('should create a tag', () => {
    expect(service.create({ 'name': 'test' })).toBeTruthy();
  });

  it('should get all tags', () => {
    expect(service.getAll()).toBeTruthy();
  });

});
