import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-registrer',
  imports: [CommonModule, FormsModule],
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css'],
})
export class RegistrerComponent {
  matricula: string = '';
  password: string = '';
  confirmPassword: string = '';
  showAlert: boolean = false;
  alertMessages: string[] = []; // Array para mensajes de alerta

  // Función para validar los campos
  validateFields() {
    this.alertMessages = []; // Limpiamos mensajes anteriores
    
    if (!this.matricula.trim()) {
      this.alertMessages.push('Por favor, ingresa tu matrícula.');
    }
    if (!this.password.trim()) {
      this.alertMessages.push('Por favor, ingresa tu contraseña.');
    }
    if (!this.confirmPassword.trim()) {
      this.alertMessages.push('Por favor, confirma tu contraseña.');
    }
    if (this.password && this.confirmPassword && this.password !== this.confirmPassword) {
      this.alertMessages.push('Las contraseñas no coinciden.');
    }
    this.showAlert = this.alertMessages.length > 0;
    
    // Configuramos el cierre automático
    if (this.showAlert) {
      timer(6000).pipe(take(1)).subscribe(() => {
        this.showAlert = false;
      });
    }
  }

  // Función para cerrar alerta manualmente
  closeAlert() {
    this.showAlert = false;
  }

  onSubmit() {
    this.validateFields();
    if (!this.showAlert) {
      console.log('Formulario enviado:', {
        matricula: this.matricula,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
    }
  }
}