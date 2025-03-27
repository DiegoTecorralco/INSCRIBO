import mongoose from "mongoose";

const clasesSchema = new mongoose.Schema(
  {
    dia: { type: String, required: true },
    clases: [
      {
        materia: { type: String, required: true },
        horario: { type: String, required: true },
        grupo: { type: String, required: false }, // Algunas clases son de "Uso Común"
        maestro: { type: String, required: false }, // No todas las clases tienen maestro registrado
        laboratorio3: { type: Boolean, default: true } // Ya que todas son en Laboratorio 3
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Clases", clasesSchema);
