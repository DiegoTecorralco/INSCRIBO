export interface Student {
  name: string; // Nombre del estudiante
  lastname: string; // Apellido del estudiante
  matricula: string; // Matrícula única del estudiante
  cuatrimestre: number; // Número del cuatrimestre (1 a 11)
  grupo: 'A' | 'B' | 'C'; // Grupo (solo puede ser A, B o C)
}