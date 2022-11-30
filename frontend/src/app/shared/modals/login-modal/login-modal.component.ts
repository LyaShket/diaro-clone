import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private readonly authService: AuthService,
    private readonly activeModal: NgbActiveModal,
  ) {
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    const { username, password } = this.formGroup.value;

    this.authService.login(username, password).subscribe(this.activeModal.close.bind(this));
  }

}
