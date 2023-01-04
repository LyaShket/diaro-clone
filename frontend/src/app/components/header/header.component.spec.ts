import { TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuidedTourService } from 'ngx-guided-tour';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Store } from '@ngxs/store';

class MockNgbModal {
  open() {}
}

class MockGuidedTourService {
  startTour() {}
}

class MockRouter {
  navigate() { return Promise.resolve(); }
}

class MockStore {
  dispatch() {}
}

class MockService {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeaderComponent,
        { provide: NgbModal, useClass: MockNgbModal },
        { provide: GuidedTourService, useClass: MockGuidedTourService },
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useClass: MockService },
        { provide: Store, useClass: MockStore },
      ],
    });

    component = TestBed.inject(HeaderComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open login modal', () => {
    const modalService = TestBed.inject(NgbModal);
    const modalSpy = spyOn(modalService, 'open');
    component.login();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should open signup modal', () => {
    const modalService = TestBed.inject(NgbModal);
    const modalSpy = spyOn(modalService, 'open');
    component.signup();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should open settings modal', () => {
    const modalService = TestBed.inject(NgbModal);
    const modalSpy = spyOn(modalService, 'open');
    component.openSettings();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should open guided tour', async () => {
    const guidedTourService = TestBed.inject(GuidedTourService);
    const guidedTourSpy = spyOn(guidedTourService, 'startTour');
    component.startTour().then(() => {
      expect(guidedTourSpy).toHaveBeenCalled();
    });
  });

  it('should logout', () => {
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'dispatch');
    component.logout();
    expect(storeSpy).toHaveBeenCalled();
  });

});
