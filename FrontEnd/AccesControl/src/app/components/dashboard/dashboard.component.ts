// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {
  teacherData: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentTeacher.subscribe(teacher => {
      this.teacherData = teacher;
      
      if (!teacher) {
        const storedTeacher = this.authService.getFromStorage('teacher');
        if (storedTeacher) {
          this.teacherData = JSON.parse(storedTeacher);
        } else {
          this.authService.clearSession();
          // Redirigir a login si es necesario
        }
      }
    });
  }
}