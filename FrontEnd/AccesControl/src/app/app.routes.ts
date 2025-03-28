import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { CompanyComponent } from './components/company/company.component';
import { MarketComponent } from './components/market/market.component';
import { FunctionComponent } from './components/function/function.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Ejemplo de componente privado
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
export const routes: Routes = [
  // Rutas públicas
  { path: '', component: LandingPageComponent },
  { path: 'login', component: SigInComponent,canActivate:[PublicGuard] },
  { path: 'register', component: RegistrerComponent ,canActivate:[PublicGuard]},
  { path: 'company', component: CompanyComponent },
  { path: 'market', component: MarketComponent },
  { path: 'function', component: FunctionComponent },

  // Rutas privadas (requieren autenticación)
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  // Puedes agregar más rutas privadas aquí...

  // Redirecciones
  { path: '**', redirectTo: '' }
];