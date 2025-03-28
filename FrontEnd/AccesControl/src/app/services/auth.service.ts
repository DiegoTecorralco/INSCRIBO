import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Cambia esta URL al puerto correcto (6000)
  private apiUrl = 'http://10.10.60.2:3000/api/auth';
  private currentTeacherSubject = new BehaviorSubject<any>(null);
  public currentTeacher = this.currentTeacherSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAuth();
    }
  }

  private initializeAuth() {
    const sessionID = this.getFromStorage('sessionID');
    if (sessionID) {
      this.checkSession(sessionID).subscribe({
        next: (response: any) => {
          if (!response?.success) {
            this.clearSession();
          }
        },
        error: () => this.clearSession()
      });
    }

    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        if (this.isLoggedIn) {
          const sessionID = this.getFromStorage('sessionID');
          if (sessionID) {
            this.checkSession(sessionID).subscribe({
              error: () => this.clearSession()
            });
          }
        }
      }, 5 * 60 * 1000); // Verifica cada 5 minutos
    }
  }

  // Métodos de almacenamiento (sin cambios)
  private getFromStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setToStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  private removeFromStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  // Método login mejorado
  login(matricula: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { matricula, password }).pipe(
      catchError(error => {
        let errorMessage = 'Error de conexión';
        if (error.status === 0) {
          errorMessage = 'No se pudo conectar al servidor';
        } else if (error.error?.error) {
          errorMessage = error.error.error;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Resto de métodos sin cambios
  logout() {
    const sessionID = this.getFromStorage('sessionID');
    if (sessionID) {
      this.http.post(`${this.apiUrl}/logout`, { sessionID }).subscribe({
        next: () => this.clearSession(),
        error: () => this.clearSession()
      });
    } else {
      this.clearSession();
    }
  }

  checkSession(sessionID: string) {
    return this.http.get(`${this.apiUrl}/session/${sessionID}`).pipe(
      catchError(() => throwError(() => new Error('Error al verificar sesión')))
    );
  }

  setSession(data: any) {
    this.setToStorage('sessionID', data.sessionID);
    this.setToStorage('teacher', JSON.stringify(data.teacher));
    this.currentTeacherSubject.next(data.teacher);
  }

  clearSession() {
    this.removeFromStorage('sessionID');
    this.removeFromStorage('teacher');
    this.currentTeacherSubject.next(null);
  }

  get isLoggedIn(): boolean {
    return !!this.getFromStorage('sessionID');
  }

  get currentTeacherValue() {
    return this.currentTeacherSubject.value;
  }
}