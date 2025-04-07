import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SigInComponent } from './components/sig-in/sig-in.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { CompanyComponent } from './components/company/company.component';
import { MarketComponent } from './components/market/market.component';
import { FunctionComponent } from './components/function/function.component';
import { MobilComponent } from './components/mobil/mobil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

export const routes: Routes = [
  // Rutas públicas
  { 
    path: '', 
    component: LandingPageComponent,
    data: { public: true } 
  },
  { 
    path: 'login', 
    component: SigInComponent,
    canActivate: [PublicGuard],
    data: { public: true, title: 'Iniciar Sesión' } 
  },
  { 
    path: 'register', 
    component: RegistrerComponent,
    canActivate: [PublicGuard],
    data: { public: true, title: 'Registro' } 
  },
  { 
    path: 'company', 
    component: CompanyComponent,
    data: { public: true, title: 'Compañía' } 
  },
  { 
    path: 'market', 
    component: MarketComponent,
    data: { public: true, title: 'Mercado' } 
  },
  { 
    path: 'function', 
    component: FunctionComponent,
    data: { public: true, title: 'Funciones' } 
  },
  { 
    path: 'mobil', 
    component: MobilComponent,
    data: { public: true, title: 'App Móvil' } 
  },

  // Rutas privadas (requieren autenticación)
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Panel de Control', requiresAuth: true }
  },
  // Ejemplo de cómo agregar más rutas privadas:
  // { 
  //   path: 'perfil', 
  //   component: ProfileComponent,
  //   canActivate: [AuthGuard],
  //   data: { title: 'Mi Perfil', requiresAuth: true }
  // },

  // Redirecciones
  { 
    path: '**', 
    redirectTo: '',
    pathMatch: 'full' 
  }
];