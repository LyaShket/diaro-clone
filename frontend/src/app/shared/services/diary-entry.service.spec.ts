import { TestBed } from '@angular/core/testing';

import { DiaryEntryService } from './diary-entry.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

class MockService {
  get = () => of({});
  post = () => of({});
  put = () => of({});
}

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

  it('should create an entry', () => {
    expect(service.create({ 'text': 'test' })).toBeTruthy();
  });

  it('should get all entries', () => {
    expect(service.getAll()).toBeTruthy();
  });

  it('should get an entry by id', () => {
    expect(service.get('test')).toBeTruthy();
  });

  it('should get a public entry by id', () => {
    expect(service.getPublic('test')).toBeTruthy();
  });

  it('should update an entry', () => {
    expect(service.update('test', { 'title': 'test' })).toBeTruthy();
  });

  it('should search entries', () => {
    expect(service.search({ 'text': 'test' })).toBeTruthy();
  });

});

