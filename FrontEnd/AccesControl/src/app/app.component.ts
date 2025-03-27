import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import {HeaderComponent} from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterModule,HeaderComponent,FooterComponent,NavbarComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AccesControl';
  isloggedIn : boolean = true;  
}