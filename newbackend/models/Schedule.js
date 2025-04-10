import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  class: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Class', 
    required: [true, 'La clase es obligatoria']
  },
  day: { 
    type: String, 
    required: [true, 'El día es obligatorio'], 
    enum: {
      values: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      message: '{VALUE} no es un día válido'
    }
  },
  startTime: { 
    type: String, 
    required: [true, 'La hora de inicio es obligatoria'],
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // formato HH:mm
      },
      message: props => `${props.value} no es una hora válida (formato esperado HH:mm)`
    }
  },
  endTime: { 
    type: String, 
    required: [true, 'La hora de fin es obligatoria'],
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // formato HH:mm
      },
      message: props => `${props.value} no es una hora válida (formato esperado HH:mm)`
    }
  }
});

// Validación personalizada para asegurar que la hora de inicio es menor que la de fin
scheduleSchema.pre('save', function (next) {
  const [startHour, startMin] = this.startTime.split(':').map(Number);
  const [endHour, endMin] = this.endTime.split(':').map(Number);

  const start = startHour * 60 + startMin;
  const end = endHour * 60 + endMin;

  if (start >= end) {
    return next(new Error('La hora de inicio debe ser menor que la hora de fin'));
  }

  next();
});

export default mongoose.model('Schedule', scheduleSchema);
