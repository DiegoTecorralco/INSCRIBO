export interface Asistencia {
    idProgramado: string; // Matrícula del estudiante
    nombre: string; // Nombre del estudiante
    materia: string; // Materia de la clase
    grupo?: string; // Grupo del estudiante (opcional)
    maestro?: string; // Maestro que da la clase (opcional)
    horario?: string; // Horario de la clase (opcional)
    fecha?: Date; // Fecha y hora del pase de lista
    tipoAsistencia: "asistencia" | "retardo" | "falta"; // Tipo de asistencia
    createdAt?: Date; // Campo proporcionado por timestamps de Mongoose
    updatedAt?: Date; // Campo proporcionado por timestamps de Mongoose
  }