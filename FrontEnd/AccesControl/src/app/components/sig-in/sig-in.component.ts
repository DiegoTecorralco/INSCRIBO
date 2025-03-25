import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sig-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent {
  matricula: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessages: string[] = [];

  validateFields() {
    this.alertMessages = [];
    
    if (!this.matricula.trim()) {
      this.alertMessages.push('Por favor, ingresa tu matrícula.');
    }
    if (!this.password.trim()) {
      this.alertMessages.push('Por favor, ingresa tu contraseña.');
    }

    this.showAlert = this.alertMessages.length > 0;
    
    if (this.showAlert) {
      timer(6000).pipe(take(1)).subscribe(() => {
        this.showAlert = false;
      });
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  onSubmit() {
    this.validateFields();
    if (!this.showAlert) {
      console.log('Formulario enviado:', {
        matricula: this.matricula,
        password: this.password
      });
      // Aquí iría la lógica para autenticar al usuario
    }
  }
}