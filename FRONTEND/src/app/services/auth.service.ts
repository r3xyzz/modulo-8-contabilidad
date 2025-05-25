import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://34.225.192.85:8000/api/login/'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      map(response => {
        // Guarda el token si tu backend lo retorna
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', username); // Guarda el usuario
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Borra el usuario al cerrar sesión
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
