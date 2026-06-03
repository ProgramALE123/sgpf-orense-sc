import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Jugadores } from './components/jugadores/jugadores';
import { Entrenadores } from './components/entrenadores/entrenadores';
import { Partidos } from './components/partidos/partidos';
import { Alineaciones } from './components/alineaciones/alineaciones';
import { Usuarios } from './components/usuarios/usuarios';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'usuarios', component: Usuarios },
  { path: 'jugadores', component: Jugadores },
  { path: 'entrenadores', component: Entrenadores },
  { path: 'partidos', component: Partidos },
  { path: 'alineaciones', component: Alineaciones },
  { path: '**', redirectTo: '' },
];
