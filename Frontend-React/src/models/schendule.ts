export interface Schedule {
  class: string; // ID de la clase (referencia a 'Class')
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes'; // Día de la semana
  startTime: string; // Hora de inicio en formato HH:mm
  endTime: string; // Hora de fin en formato HH:mm
}