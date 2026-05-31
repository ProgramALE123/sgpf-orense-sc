import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Jugador, JugadoresService } from '../../services/jugadores';
import { Partido, PartidosService } from '../../services/partidos';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  totalJugadores: number = 0;
  totalEntrenadores: number = 5;
  totalPartidos: number = 0;

  ultimosJugadores: Jugador[] = [];
  ultimosPartidos: Partido[] = [];
  proximosPartidos: Partido[] = [];

  constructor(
    private jugadoresService: JugadoresService,
    private partidosService: PartidosService
  ) {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.totalJugadores = this.jugadoresService.obtenerTotalJugadores();
    this.ultimosJugadores = this.jugadoresService.obtenerUltimosJugadores();

    this.totalPartidos = this.partidosService.obtenerTotalPartidos();
    this.ultimosPartidos = this.partidosService.obtenerUltimosJugados(4);
    this.proximosPartidos = this.partidosService.obtenerProximos(3);
  }

  obtenerEstado(resultado: string): string {
    if (!resultado) return 'Programado';
    const [gF, gC] = resultado.split('-').map(Number);
    if (gF > gC) return 'Victoria';
    if (gF < gC) return 'Derrota';
    return 'Empate';
  }

  obtenerClaseBadge(resultado: string): string {
    const estado = this.obtenerEstado(resultado);
    if (estado === 'Victoria') return 'badge bg-success';
    if (estado === 'Derrota') return 'badge bg-danger';
    if (estado === 'Empate') return 'badge bg-warning text-dark';
    return 'badge bg-secondary';
  }
}