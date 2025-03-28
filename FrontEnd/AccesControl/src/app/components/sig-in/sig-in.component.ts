import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent {
  matricula: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessages: string[] = [];
  isLoading: boolean = false; // Nuevo estado para loading

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
      setTimeout(() => this.showAlert = false, 6000);
    }
    return !this.showAlert;
  }

  onSubmit() {
    if (!this.validateFields()) return;
    
    this.isLoading = true;
    this.authService.login(this.matricula, this.password).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response?.success) {
          this.authService.setSession(response);
          this.router.navigate(['/dashboard']);
        } else {
          this.showError(response?.error || 'Error desconocido');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.showError(error.message || 'Error en el servidor');
      }
    });
  }

  private showError(message: string) {
    this.alertMessages = [message];
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 6000);
  }

  closeAlert() {
    this.showAlert = false;
  }
}