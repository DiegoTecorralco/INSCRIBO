import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import {HeaderComponent} from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que el componente sea standalone
  imports: [RouterOutlet, RouterModule,HeaderComponent,FooterComponent,NavbarComponent], // Importa RouterModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AccesControl';
  isloggedIn : boolean = false;  
}