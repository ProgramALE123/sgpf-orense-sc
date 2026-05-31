import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JugadoresService{
private jugadores: Jugador[] = [
  {
    nombres: 'Fidel',
    apellidos: 'Martínez',
    edad: 34,
    posicion: 'Delantero',
    estatura: 175,
    peso: 72,
    camiseta: 10,
    foto: 'https://ui-avatars.com/api/?name=Fidel+Martinez&background=123d25&color=fff'
  },
  {
    nombres: 'Fernando',
    apellidos: 'Gaibor',
    edad: 32,
    posicion: 'Mediocampista',
    estatura: 178,
    peso: 76,
    camiseta: 8,
    foto: 'https://i.ibb.co/Ps068GT5/Gemini-Generated-Image-soxfzlsoxfzlsoxf.png'
  },
  {
    nombres: 'Gabriel',
    apellidos: 'Achilier',
    edad: 39,
    posicion: 'Defensa',
    estatura: 181,
    peso: 80,
    camiseta: 24,
    foto: 'https://ui-avatars.com/api/?name=Gabriel+Achilier&background=123d25&color=fff'
  }
];

  obtenerJugadores(): Jugador[] {
    return this.jugadores;
  }

  obtenerTotalJugadores(): number {
    return this.jugadores.length;
  }

  obtenerUltimosJugadores(): Jugador[] {
    return this.jugadores.slice(-3);
  }

  agregarJugador(jugador: Jugador): void {
    this.jugadores.push({ ...jugador });
  }

  editarJugador(indice: number, jugador: Jugador): void {
    this.jugadores[indice] = { ...jugador };
  }

  eliminarJugador(indice: number): void {
    this.jugadores.splice(indice, 1);
  }
}

export interface Jugador {
  nombres: string;
  apellidos: string;
  edad: number;
  posicion: string;
  estatura: number;
  peso: number;
  camiseta: number;
  foto: string;
}

