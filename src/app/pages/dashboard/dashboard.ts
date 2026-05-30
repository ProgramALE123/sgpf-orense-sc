import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  totalJugadores: number = 18;
  totalEntrenadores: number = 5;
  totalPartidos: number = 8;
  totalAlineaciones: number = 0;

  ultimosPartidos =[
    {
      fecha: '2026-05-12',
      rival: 'Aucas',
      lugar: 'Visita',
      resultado: '2-1',
    },
    {
      fecha: '2026-05-19',
      rival: 'Barcelona',
      lugar: 'Local',
      resultado: '1-1',
    },
    {
      fecha: '2026-05-26',
      rival: 'Emelec',
      lugar: 'Visita',
      resultado: '-',
    },
    {
      fecha: '2026-06-02',
      rival: 'Independiente del Valle',
      lugar: 'Local',
      resultado: '-',
    },
    {
      fecha: '2026-06-09',
      rival: 'LDU Quito',
      lugar: 'Visita',
      resultado: '-',
    }
  ];
  ultimosJugadores = [
    {
      nombre: 'Fidel Martínez',
      posicion: 'Extremo izquierdo',
      dorsal: 7
    },
    {
      nombre: 'Gonzalo Mastriani',
      posicion: 'Delantero centro',
      dorsal: 9
    },
    {
      nombre: 'Fernando Gaibor',
      posicion: 'Mediocampista central',
      dorsal: 8
    },
    {
      nombre: 'Lionel Messi',
      posicion: 'Extremo derecho',
      dorsal: 10
    }
  ];
}
