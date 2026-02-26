import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../auth/models/login-request';
import { LoginResponse } from '../../auth/models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Clé utilisée pour stocker le JWT dans le navigateur.
   * Simple et suffisant pour une démo/portfolio.
   */
  private readonly tokenStorageKey = 'auth_token';

  constructor(private readonly http: HttpClient) {}

  /**
   * Appelle l'API pour se connecter et stocke le token JWT en cas de succès.
   */
  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/api/login`, payload)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  /**
   * Déconnecte l'utilisateur en supprimant le token.
   */
  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
  }

  /**
   * Indique si un token est présent (auth basique).
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Récupère le token JWT stocké.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  /**
   * Stocke le token JWT.
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenStorageKey, token);
  }
}
