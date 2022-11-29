import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent {
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly activeModal: NgbActiveModal,
  ) {
    this.authService.profile().subscribe(res => {
      console.log('profile', res);
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    const { username, password, passwordRepeat } = this.formGroup.value;
    if (password !== passwordRepeat) {
      return;
    }

    this.authService.register(username, password)
      .subscribe(access_token => {
        localStorage.setItem('access_token', access_token);
        this.activeModal.close();
      });
  }

}
