import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Login, Registro, RegistroResponse } from '../interfaces/loginDto';
import { HttpClient } from '@angular/common/http';

export interface AuthUser {
  id: number;
  nombre: string;
  usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(credentials: Login): Observable<boolean> {
    return this.http.post<AuthUser>(`${this.apiUrl}/login`, {
      username: credentials.username,
      password: credentials.password
    }).pipe(
      map((user: AuthUser) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }),
      catchError(() => of(false))
    );
  }

  registro(nuevoUsuaruio: Registro): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>(`${this.apiUrl}/users`, nuevoUsuaruio);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): AuthUser | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}

