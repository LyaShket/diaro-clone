import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { catchError, filter, first, map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new Subject<IUser>();

  constructor(
    private http: HttpClient,
    private readonly toastr: ToastrService,
  ) {
    this.profile().subscribe();
  }

  login(username: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', { username, password }).pipe(
      first(),
      catchError(res => {
        if (res.status === HttpStatusCode.Unauthorized) {
          this.toastr.error('Incorrect username or password', 'Login error');
        }
        return of(null);
      }),
      filter(i => !!i),
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        this.profile().subscribe();
        this.toastr.success('Login success');
      }),
    );
  }

  register(username: string, password: string) {
    return this.http.post<{ access_token: string }>('http://localhost:3000/auth/register', { username, password }).pipe(
      first(),
      catchError(res => {
        if (res.status === HttpStatusCode.Conflict) {
          this.toastr.error('Username is already taken', 'Register error');
        }
        return of(null);
      }),
      filter(i => !!i),
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        this.profile().subscribe();
        this.toastr.success('Register success');
      }),
    );
  }

  profile(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:3000/auth/profile').pipe(
      first(),
      tap(res => {
        if (!res) {
          return;
        }
        this.user$.next(res);
      }));
  }
}
