import { TestBed } from '@angular/core/testing';

import { LoginModalComponent } from './login-modal.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngxs/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

class MockService {}

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        LoginModalComponent,
        FormBuilder,
        { provide: AuthService, useClass: MockService },
        { provide: NgbActiveModal, useClass: MockService },
        { provide: Store, useClass: MockService },
      ],
    });

    component = TestBed.inject(LoginModalComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
