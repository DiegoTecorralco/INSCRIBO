import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; // Importa RouterModule
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { routes } from './app.routes'; // Importa las rutas

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que el componente sea standalone
  imports: [RouterOutlet, LandingPageComponent, SigInComponent, RouterModule], // Importa RouterModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AccesControl';
}