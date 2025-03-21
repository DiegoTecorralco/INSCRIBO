import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Ruta principal (Landing Page)
  { path: 'login', component: SigInComponent }, // Ruta para el formulario de inicio de sesión
    {path:'register',component:RegistrerComponent},
  { path: '**', redirectTo: '' }, // Redirige cualquier ruta no válida a la Landing Page
];