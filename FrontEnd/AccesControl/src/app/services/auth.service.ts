import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.1.73:6000/api/auth';
  private currentTeacherSubject = new BehaviorSubject<any>(null);
  public currentTeacher = this.currentTeacherSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar sesión al inicializar
    const sessionID = localStorage.getItem('sessionID');
    if (sessionID) {
      this.checkSession(sessionID).subscribe({
        next: (response: any) => {
          if (!response.success) {
            this.clearSession();
          }
        },
        error: () => this.clearSession()
      });
    }
  
    // Verificar cada 5 minutos
    setInterval(() => {
      if (this.isLoggedIn) {
        const sessionID = localStorage.getItem('sessionID');
        if (sessionID) {
          this.checkSession(sessionID).subscribe({
            error: () => this.clearSession()
          });
        }
      }
    }, 5 * 60 * 1000);
  }
  
  login(matricula: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { matricula, password });
  }

  logout() {
    const sessionID = localStorage.getItem('sessionID');
    if (sessionID) {
      this.http.post(`${this.apiUrl}/logout`, { sessionID }).subscribe({
        next: () => this.clearSession()
      });
    } else {
      this.clearSession();
    }
  }

  checkSession(sessionID: string) {
    return this.http.get(`${this.apiUrl}/session/${sessionID}`);
  }

  setSession(data: any) {
    localStorage.setItem('sessionID', data.sessionID);
    localStorage.setItem('teacher', JSON.stringify(data.teacher));
    this.currentTeacherSubject.next(data.teacher);
  }

  clearSession() {
    localStorage.removeItem('sessionID');
    localStorage.removeItem('teacher');
    this.currentTeacherSubject.next(null);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('sessionID');
  }

  get currentTeacherValue() {
    return this.currentTeacherSubject.value;
  }
}