export interface Class {
  subject: string; // ID de la materia (referencia a 'Subject')
  teacher: string; // ID del profesor (referencia a 'Teacher')
  teacherMatricula: string; // Matrícula del profesor
  cuatrimestre: number; // Número del cuatrimestre
  grupo: 'A' | 'B' | 'C'; // Grupo (solo puede ser A, B o C)
}