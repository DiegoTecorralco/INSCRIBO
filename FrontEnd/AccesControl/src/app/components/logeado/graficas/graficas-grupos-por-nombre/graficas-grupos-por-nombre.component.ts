import { Component, OnInit, OnDestroy } from '@angular/core';
import { AttendanceService } from '../../../../services/attendance.service';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-graficas-grupos-por-nombre',
  templateUrl: './graficas-grupos-por-nombre.component.html',
  styleUrls: ['./graficas-grupos-por-nombre.component.css']
})
export class GraficasGruposPorNombreComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  private chart!: am5xy.XYChart;
  private xAxis!: am5xy.CategoryAxis<am5xy.AxisRenderer>;
  private yAxis!: am5xy.ValueAxis<am5xy.AxisRenderer>;
  private seriesList: am5xy.ColumnSeries[] = [];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    // Inicializar el gráfico vacío mientras llegan los datos
    this.initEmptyChart();

    // Suscripción a los datos de asistencia
    this.attendanceService.attendanceData$.subscribe(data => {
      this.updateChartWithData(data);
    });
  }

  ngOnDestroy(): void {
    // Limpiar el gráfico cuando el componente se destruye
    if (this.root) {
      this.root.dispose();
    }
  }

  private initEmptyChart(): void {
    // Crear elemento root
    this.root = am5.Root.new('chartdiv');
    
    // Configurar tema
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    // Crear gráfica
    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: this.root.verticalLayout
      })
    );

    // Configurar ejes
    this.createAxes();

    // Añadir leyenda
    const legend = this.chart.children.push(
      am5.Legend.new(this.root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );

    // Configurar cursor
    this.chart.set('cursor', am5xy.XYCursor.new(this.root, {}));
  }

  private createAxes(): void {
    // Crear eje X
    this.xAxis = this.chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        renderer: am5xy.AxisRendererX.new(this.root, {
          minGridDistance: 30
        }),
        categoryField: 'nombre'
      })
    );

    // Crear eje Y
    this.yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );
  }

  private updateChartWithData(data: any[]): void {
    // Procesar datos para amCharts
    const groupedData = this.attendanceService.getGroupedData();
    const chartData = Object.keys(groupedData).map(name => ({
      nombre: name,
      ...groupedData[name]
    }));

    // Configurar datos del eje X
    this.xAxis.data.setAll(chartData);

    // Eliminar series existentes
    this.seriesList.forEach(series => series.dispose());
    this.seriesList = [];

    // Crear series para cada tipo de asistencia
    this.createSeries('asistencias', 'Asistencias', am5.color(0x4CAF50));
    this.createSeries('faltas', 'Faltas', am5.color(0xF44336));
    this.createSeries('retardos', 'Retardos', am5.color(0xFFC107));

    // Actualizar datos en todas las series
    this.seriesList.forEach(series => {
      series.data.setAll(chartData);
    });
  }

  private createSeries(field: string, name: string, color: am5.Color): void {
    const series = this.chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        name: name,
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        valueYField: field,
        categoryXField: 'nombre',
        fill: color,
        stroke: color,
        tooltip: am5.Tooltip.new(this.root, {
          labelText: '{name}: {valueY}'
        })
      })
    );

    // Configurar animaciones de la serie
    series.columns.template.setAll({
      width: am5.percent(80),
      cornerRadiusTL: 5,
      cornerRadiusTR: 5
    });

    series.appear(1000);
    series.data.setAll(this.chart.data);

    this.seriesList.push(series);
  }
}