import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Jugadores } from './components/jugadores/jugadores';
import { Entrenadores } from './components/entrenadores/entrenadores';
import { Partidos } from './components/partidos/partidos';
import { Alineaciones } from './components/alineaciones/alineaciones';
import { Usuarios } from './components/usuarios/usuarios';

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
