import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://10.10.60.2:3000/api/asistencia';
  private attendanceDataSubject = new BehaviorSubject<any[]>([]);
  public attendanceData$ = this.attendanceDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllAttendance().subscribe({
        next: (data) => this.attendanceDataSubject.next(data.data),
        error: (err) => console.error('Error loading attendance data:', err)
      });
    }
  }

  getAllAttendance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`).pipe(
      catchError(error => {
        let errorMessage = 'Error al obtener datos de asistencia';
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getGroupedData(): any {
    const currentData = this.attendanceDataSubject.value;
    const grouped = {};

    currentData.forEach(item => {
      if (!grouped[item.nombre]) {
        grouped[item.nombre] = {
          faltas: 0,
          asistencias: 0,
          retardos: 0
        };
      }
      
      if (item.tipoAsistencia === 'falta') {
        grouped[item.nombre].faltas++;
      } else if (item.tipoAsistencia === 'asistencia') {
        grouped[item.nombre].asistencias++;
      } else if (item.tipoAsistencia === 'retardo') {
        grouped[item.nombre].retardos++;
      }
    });

    return grouped;
  }
}