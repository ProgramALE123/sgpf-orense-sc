import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Jugadores } from './pages/jugadores/jugadores';
import { Entrenadores } from './pages/entrenadores/entrenadores';
import { Partidos } from './pages/partidos/partidos';
import { Alineaciones } from './pages/alineaciones/alineaciones';
import { Usuarios } from './pages/usuarios/usuarios';
export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'jugadores', component: Jugadores },
  { path: 'entrenadores', component: Entrenadores },
  { path: 'partidos', component: Partidos },
  { path: 'alineaciones', component: Alineaciones },
  { path: 'usuarios', component: Usuarios }
];
