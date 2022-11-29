import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, filter, first, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private readonly toastr: ToastrService,
  ) {
  }

  login(username: string, password: string) {
    return this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', { username, password })
      .pipe(
        first(),
        catchError(res => {
          if (res.status === HttpStatusCode.Unauthorized) {
            this.toastr.error('Incorrect username or password', 'Login error');
          }
          return of(null);
        }),
        filter(i => !!i),
        tap(() => this.toastr.success('Login success')),
        map(res => res.access_token)
      );
  }

  register(username: string, password: string) {
    return this.http.post<{ access_token: string }>('http://localhost:3000/auth/register', { username, password })
      .pipe(
        first(),
        catchError(res => {
          if (res.status === HttpStatusCode.Conflict) {
            this.toastr.error('Username is already taken', 'Register error');
          }
          return of(null);
        }),
        filter(i => !!i),
        tap(() => this.toastr.success('Register success')),
        map(res => res.access_token)
      );
  }

  profile() {
    return this.http.get('http://localhost:3000/auth/profile');
  }
}
