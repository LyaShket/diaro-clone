import { Injectable, NgZone } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of, tap } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth/auth.service';
import { IUser } from '../../shared/interfaces/user';
import { LoadProfile, Login, Logout, Register, UpdateProfile, UpdateProfileSuccess } from './auth.actions';
import { HttpStatusCode } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface AuthStateModel {
  user: IUser,
}

export const authStateDefaults: AuthStateModel = {
  user: null
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: authStateDefaults
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private ngZone: NgZone,
  ) {
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Action(Login)
  login(
    { dispatch }: StateContext<AuthStateModel>,
    action: Login
  ) {
    return this.authService.login(action.payload).pipe(
      catchError(res => {
        if (res.status === HttpStatusCode.Unauthorized) {
          this.toastr.error('Incorrect username or password', 'Login error');
        }
        return of(null);
      }),
      filter(i => !!i),
      map((res: { access_token: string }) => {
        localStorage.setItem('access_token', res.access_token);
        this.toastr.success('Login success');
        return (dispatch(new LoadProfile()));
      }),
    );
  }

  @Action(Register)
  register(
    { dispatch }: StateContext<AuthStateModel>,
    action: Register
  ) {
    return this.authService.register(action.payload).pipe(
      catchError(res => {
        if (res.status === HttpStatusCode.Conflict) {
          this.toastr.error('Username is already taken', 'Register error');
        }
        return of(null);
      }),
      filter(i => !!i),
      map((res) => {
        localStorage.setItem('access_token', res.access_token);
        this.toastr.success('Register success');
        return dispatch(new LoadProfile());
      }),
    );
  }

  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    localStorage.removeItem('access_token');
    patchState({ user: null });
  }

  @Action(LoadProfile)
  loadProfile({ patchState }: StateContext<AuthStateModel>) {
    return this.authService.profile().pipe(
      map(user => patchState({ user }))
    );
  }

  @Action(UpdateProfile)
  updateProfile(
    { dispatch }: StateContext<AuthStateModel>,
    action: UpdateProfile
  ) {
    return this.authService.updateProfile(action.payload).pipe(
      map(user => dispatch(new UpdateProfileSuccess(user)))
    );
  }

  @Action(UpdateProfileSuccess)
  updateProfileSuccess(
    { patchState }: StateContext<AuthStateModel>,
    action: UpdateProfileSuccess
  ) {
    patchState({ user: action.user });
    this.ngZone.run(() => {
      this.toastr.success('Profile updated');
    });
  }

}
