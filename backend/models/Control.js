import { model, Schema } from 'mongoose';

const controlSchema = new Schema({
  studentID: {
    unique: true,
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  grade: {
    required: true,
    type: Number,
  },
  group: {
    required: true,
    type: String,
  },
  shift: {
    required: true,
    type: String,
    enum: ['Matutino', 'Vespertino'],
  },
  status: { // Estado del estudiante
    type: String,
    enum: ['Activo', 'Suspendido', 'Egresado'],
    default: 'Activo',
  },
  accessLogs: [ // Historial de accesos
    {
      date: { type: Date, default: Date.now },
      type: { type: String, enum: ['Entrada', 'Salida'] },
    },
  ],
  role: { // Rol de acceso
    type: String,
    enum: ['Estudiante', 'Prefecto', 'Administrador','maestro'],
    default: 'Estudiante',
  },
}, { 
  timestamps: true,
  versionKey: false 
});

const Control = model('control', controlSchema);
export default Control;
