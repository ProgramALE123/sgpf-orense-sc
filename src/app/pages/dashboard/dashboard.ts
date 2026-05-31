import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Jugador, JugadoresService } from '../../services/jugadores';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   totalJugadores: number = 0;
  totalEntrenadores: number = 5;
  totalPartidos: number = 8;
  totalAlineaciones: number = 0;

  ultimosJugadores: Jugador[] = [];

  ultimosPartidos = [
    {
      fecha: '2026-05-12',
      rival: 'Aucas',
      lugar: 'Visita',
      resultado: '2-0'
    },
    {
      fecha: '2026-05-19',
      rival: 'Independiente del Valle',
      lugar: 'Local',
      resultado: '1-1'
    },
    {
      fecha: '2026-05-26',
      rival: 'El Nacional',
      lugar: 'Visita',
      resultado: '-'
    },
    {
      fecha: '2026-06-02',
      rival: 'Delfín SC',
      lugar: 'Local',
      resultado: '-'
    }
  ];

  constructor(private jugadoresService: JugadoresService) {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.totalJugadores = this.jugadoresService.obtenerTotalJugadores();
    this.ultimosJugadores = this.jugadoresService.obtenerUltimosJugadores();
  }
}
