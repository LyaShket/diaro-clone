import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { IUser } from '../../interfaces/user';
import { AuthState } from '../../../store/auth/auth.state';
import { Observable } from 'rxjs';
import { UpdateProfile } from '../../../store/auth/auth.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {
  @Select(AuthState.getUser) user$: Observable<IUser>;

  formGroup = this.fb.group({
    // password: ['', [Validators.required]],
    // repeatPassword: ['', [Validators.required]],
    avatar: ['', [Validators.required, Validators.pattern('https?://.+')]],
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user$.pipe(filter(user => !!user)).subscribe(user => {
      this.formGroup.controls.avatar.setValue(user.avatar);
    });
  }

  submit() {
    this.store.dispatch(new UpdateProfile(<any>this.formGroup.value));
  }
}
