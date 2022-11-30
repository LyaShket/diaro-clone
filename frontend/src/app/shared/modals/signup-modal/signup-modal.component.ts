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
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    const { username, password, passwordRepeat } = this.formGroup.value;
    if (password !== passwordRepeat) {
      return;
    }

    this.authService.register(username, password).subscribe(() => {
      this.activeModal.close();
      location.reload();
    });
  }

}
