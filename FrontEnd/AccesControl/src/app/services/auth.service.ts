import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
          if (!response.success) {
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
      }, 5 * 60 * 1000);
    }
  }

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

  login(matricula: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { matricula, password });
  }

  logout() {
    const sessionID = this.getFromStorage('sessionID');
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