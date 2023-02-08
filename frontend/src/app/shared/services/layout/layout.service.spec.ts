import { TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a observable called "toggleSidebar$"', () => {
    expect(service.toggleSidebar$).toBeTruthy();
  });

  it('should have a method called "toggleSidebar"', () => {
    expect(service.toggleSidebar).toBeTruthy();
  });

  it('should toggle the value of "toggleSidebar$"', () => {
    service.toggleSidebar$.next(true);
    service.toggleSidebar();
    expect(service.toggleSidebar$.value).toBeFalsy();
    service.toggleSidebar();
    expect(service.toggleSidebar$.value).toBeTruthy();
  });
});
