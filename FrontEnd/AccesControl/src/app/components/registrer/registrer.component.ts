import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-registrer',
  imports: [CommonModule,FormsModule],
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css'],
})
export class RegistrerComponent {
  matricula: string = ''; // Campo de matrícula
  password: string = ''; // Campo de contraseña
  confirmPassword: string = ''; // Campo de confirmar contraseña
  showAlert: boolean = false; // Controla si se muestra la alerta

  // Función para validar los campos
  validateFields() {
    if (!this.matricula.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.showAlert = true; // Muestra la alerta si algún campo está vacío
    } else {
      this.showAlert = false; // Oculta la alerta si todos los campos tienen valor
    }
  }

  // Función para enviar el formulario
  onSubmit() {
    this.validateFields(); // Valida los campos antes de enviar
    if (!this.showAlert) {
      console.log('Formulario enviado:', {
        matricula: this.matricula,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
      // Aquí puedes agregar la lógica para enviar el formulario
    }
  }
}