import { IUser } from '../../interfaces/user';
import { Observable, of } from 'rxjs';

export class AuthServiceStub {
  profile(): Observable<IUser> {
    return of({} as IUser);
  }

  login(payload: { username: string, password: string }): Observable<{ access_token: string }> {
    return of({ access_token: 'access_token' });
  }

  register(payload: { username: string, password: string }): Observable<{ access_token: string }> {
    return of({ access_token: 'access_token' });
  }

  updateProfile(payload: { avatar: string }): Observable<IUser> {
    return of({} as IUser);
  }
}
