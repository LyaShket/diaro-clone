import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

class MockHttpClient {
  get = () => of({});
  post = () => of({});
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the current user profile', () => {
    expect(service.profile()).toBeTruthy();
  });

  it('should login', () => {
    expect(service.login({ 'username': 'test', 'password': 'test' })).toBeTruthy();
  });

  it('should register', () => {
    expect(service.register({ 'username': 'test', 'password': 'test' })).toBeTruthy();
  });

});
