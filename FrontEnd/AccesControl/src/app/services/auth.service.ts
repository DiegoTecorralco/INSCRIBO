import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://10.10.60.2:3000/api/auth';
  private currentTeacherSubject: BehaviorSubject<any>;
  public currentTeacher: Observable<any>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializar con datos del localStorage si existen
    let initialTeacher = null;
    if (isPlatformBrowser(this.platformId)) {
      const teacherData = this.getFromStorage('teacher');
      initialTeacher = teacherData ? JSON.parse(teacherData) : null;
    }
    
    this.currentTeacherSubject = new BehaviorSubject<any>(initialTeacher);
    this.currentTeacher = this.currentTeacherSubject.asObservable();

    if (isPlatformBrowser(this.platformId)) {
      this.initializeAuth();
      // Escuchar cambios en el almacenamiento entre pestañas
      window.addEventListener('storage', this.storageEventListener.bind(this));
    }
  }

  private storageEventListener(event: StorageEvent) {
    if (event.key === 'sessionID' && !event.newValue) {
      this.clearSession();
    }
    if (event.key === 'teacher') {
      this.currentTeacherSubject.next(event.newValue ? JSON.parse(event.newValue) : null);
    }
  }

  private initializeAuth() {
    const sessionID = this.getFromStorage('sessionID');
    if (sessionID) {
      this.checkSession(sessionID).subscribe({
        next: (response: any) => {
          if (!response?.success) {
            this.clearSession();
          } else {
            // Actualizar datos del profesor si la sesión es válida
            const teacherData = this.getFromStorage('teacher');
            if (teacherData) {
              this.currentTeacherSubject.next(JSON.parse(teacherData));
            }
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

  // Métodos de almacenamiento
  public getFromStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setToStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
      // Disparar evento para otras pestañas
      window.dispatchEvent(new Event('storage'));
    }
  }

  private removeFromStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
      // Disparar evento para otras pestañas
      window.dispatchEvent(new Event('storage'));
    }
  }

  // Método login mejorado
  login(matricula: string, password: string): Observable<any> {
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

  logout(): void {
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

  checkSession(sessionID: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/session/${sessionID}`).pipe(
      catchError(() => throwError(() => new Error('Error al verificar sesión')))
    );
  }

  setSession(data: any): void {
    this.setToStorage('sessionID', data.sessionID);
    this.setToStorage('teacher', JSON.stringify(data.teacher));
    this.currentTeacherSubject.next(data.teacher);
    // Disparar evento personalizado para notificar cambios
    if (isPlatformBrowser(this.platformId)) {
      window.dispatchEvent(new CustomEvent('authChange', { detail: { isLoggedIn: true } }));
    }
  }

  clearSession(): void {
    this.removeFromStorage('sessionID');
    this.removeFromStorage('teacher');
    this.currentTeacherSubject.next(null);
    // Disparar evento personalizado para notificar cambios
    if (isPlatformBrowser(this.platformId)) {
      window.dispatchEvent(new CustomEvent('authChange', { detail: { isLoggedIn: false } }));
    }
  }

  get isLoggedIn(): boolean {
    return !!this.getFromStorage('sessionID');
  }

  get currentTeacherValue(): any {
    return this.currentTeacherSubject.value;
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('storage', this.storageEventListener.bind(this));
    }
  }
}