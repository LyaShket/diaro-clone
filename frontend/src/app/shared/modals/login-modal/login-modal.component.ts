import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, filter, first, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { NgbActiveModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private readonly authService: AuthService,
    private readonly activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    const { username, password } = this.formGroup.value;

    this.authService.login(username, password)
      .subscribe(access_token => {
        localStorage.setItem('access_token', access_token);
        this.activeModal.close();
      });
  }

}
