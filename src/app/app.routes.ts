import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Jugadores } from './pages/jugadores/jugadores';
import { Entrenadores } from './pages/entrenadores/entrenadores';
import { Partidos } from './pages/partidos/partidos';
import { Alineaciones } from './pages/alineaciones/alineaciones';
import { Usuarios } from './pages/usuarios/usuarios';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'usuarios', component: Usuarios, canActivate: [authGuard] },
  { path: 'jugadores', component: Jugadores, canActivate: [authGuard] },
  { path: 'entrenadores', component: Entrenadores, canActivate: [authGuard] },
  { path: 'partidos', component: Partidos, canActivate: [authGuard] },
  { path: 'alineaciones', component: Alineaciones, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
