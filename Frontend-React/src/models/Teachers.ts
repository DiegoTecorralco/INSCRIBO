export interface Teacher {
  name: string; // Nombre del profesor
  lastname: string; // Apellido del profesor
  matricula: string; // Matrícula única del profesor
  password: string; // Contraseña del profesor
  createdAt: string; // Fecha de creación (ISO 8601)
  lastAccessed: string; // Última fecha de acceso (ISO 8601)
}