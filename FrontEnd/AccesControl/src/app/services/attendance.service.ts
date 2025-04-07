import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://10.10.60.2:3000/api/asistencia';
  private attendanceDataSubject = new BehaviorSubject<any[]>([]);
  public attendanceData$ = this.attendanceDataSubject.asObservable();
  
  // EventEmitter para comunicación con componentes padre
  public dataUpdated = new EventEmitter<any[]>();

  constructor(private http: HttpClient) {
    this.loadInitialData();
    this.setupPolling();
  }

  private loadInitialData(): void {
    this.getAllAttendance().subscribe({
      next: (data) => {
        this.attendanceDataSubject.next(data.data);
        this.dataUpdated.emit(data.data); // Emitir los datos iniciales
      },
      error: (err) => console.error('Error loading attendance data:', err)
    });
  }

  private setupPolling(): void {
    // Actualizar datos cada 30 segundos (ajustable)
    setInterval(() => {
      if (this.attendanceDataSubject.value.length > 0) { // Solo si ya hay datos
        this.getAllAttendance().subscribe({
          next: (data) => {
            this.attendanceDataSubject.next(data.data);
            this.dataUpdated.emit(data.data); // Emitir datos actualizados
          },
          error: (err) => console.error('Error polling attendance data:', err)
        });
      }
    }, 30000);
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

  // Método para filtrar datos por nombre (opcional)
  filterByName(name: string): any[] {
    const currentData = this.attendanceDataSubject.value;
    return currentData.filter(item => 
      item.nombre.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Método para obtener datos agrupados (útil para gráficas)
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