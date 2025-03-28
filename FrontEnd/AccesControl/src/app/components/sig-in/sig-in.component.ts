import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sig-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent {
  matricula: string = '';
  password: string = '';
  showAlert: boolean = false;
  alertMessages: string[] = [];

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
  }

  closeAlert() {
    this.showAlert = false;
  }

  onSubmit() {
    this.validateFields();
    if (!this.showAlert) {
      this.authService.login(this.matricula, this.password).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.authService.setSession(response);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.alertMessages = [error.error.error || 'Error en el servidor'];
          this.showAlert = true;
          setTimeout(() => this.showAlert = false, 6000);
        }
      });
    }
  }
}