import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  teacherData: any;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.currentTeacher.subscribe(teacher => {
      this.teacherData = teacher;
      
      if (!teacher) {
        const storedTeacher = this.authService.getFromStorage('teacher');
        this.teacherData = storedTeacher ? JSON.parse(storedTeacher) : null;
        
        if (!this.teacherData) {
          this.authService.clearSession();
        }
      }
    });
  }
}