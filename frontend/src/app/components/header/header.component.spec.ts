import { TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuidedTourService } from 'ngx-guided-tour';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Store } from '@ngxs/store';

class MockService {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeaderComponent,
        { provide: NgbModal, useClass: MockService },
        { provide: GuidedTourService, useClass: MockService },
        { provide: Router, useClass: MockService },
        { provide: AuthService, useClass: MockService },
        { provide: Store, useClass: MockService },
      ],
    });

    component = TestBed.inject(HeaderComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
