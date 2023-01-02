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
  constructor(
    private http: HttpClient,
  ) {
    this.profile().subscribe();
  }

  login(payload: { username: string, password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', payload).pipe(first());
  }

  register(payload: { username: string, password: string }) {
    return this.http.post<{ access_token: string }>('http://localhost:3000/auth/register', payload).pipe(first());
  }

  profile(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:3000/auth/profile').pipe(first());
  }

  updateProfile(payload: { avatar: string }) {
    return this.http.put<IUser>('http://localhost:3000/auth/profile', payload).pipe(first());
  }
}
