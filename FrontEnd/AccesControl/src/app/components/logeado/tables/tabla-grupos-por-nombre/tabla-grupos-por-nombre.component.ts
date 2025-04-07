import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { AttendanceService } from '../../../../services/attendance.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tabla-grupos-por-nombre',
  templateUrl: './tabla-grupos-por-nombre.component.html',
  styleUrls: ['./tabla-grupos-por-nombre.component.css']
})
export class TablaGruposPorNombreComponent implements OnInit, OnDestroy {
  attendanceData: any[] = [];
  isBrowser: boolean;

  constructor(
    private attendanceService: AttendanceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.attendanceService.attendanceData$.subscribe(data => {
      this.attendanceData = data;
      if (this.isBrowser) {
        this.initDataTable();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser && (window as any).$ && (window as any).$.fn.DataTable) {
      const table = (window as any).$('#attendanceTable').DataTable();
      if (table) {
        table.destroy();
      }
    }
  }

  private initDataTable(): void {
    if (!this.isBrowser) return;

    setTimeout(() => {
      if ((window as any).$ && (window as any).$.fn.DataTable) {
        if ((window as any).$.fn.DataTable.isDataTable('#attendanceTable')) {
          (window as any).$('#attendanceTable').DataTable().destroy();
        }

        (window as any).$('#attendanceTable').DataTable({
          dom: 'Bfrtip',
          buttons: [
            'copy', 'csv', 'excel', 'print'
          ],
          responsive: true,
          language: {
            url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
          }
        });
      }
    }, 0);
  }

  getGroupedData(): any[] {
    const groupedData = this.attendanceService.getGroupedData();
    return Object.keys(groupedData).map(name => {
      const item = groupedData[name];
      return {
        nombre: name,
        asistencias: item.asistencias,
        faltas: item.faltas,
        retardos: item.retardos,
        total: item.asistencias + item.faltas + item.retardos,
        porcentaje: ((item.asistencias / (item.asistencias + item.faltas + item.retardos)) * 100
      };
    });
  }
}