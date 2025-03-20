import {model, Schema} from "mongoose";
import moment from 'moment-timezone';

// Definir el esquema y modelo para la colección "admin"
const AdminSchema = new Schema({
    name: String,
    pass: String
});

const Administrador = model('admin', AdminSchema);
export default  Administrador;
