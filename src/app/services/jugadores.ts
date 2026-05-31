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
    camiseta: 51,
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
  },
  {
  nombres: 'Lionel',
  apellidos: 'Messi',
  edad: 38,
  posicion: 'Extremo derecho',
  estatura: 170,
  peso: 72,
  camiseta: 10,
  foto: 'https://ui-avatars.com/api/?name=Lionel+Messi&background=123d25&color=fff'
},
{
  nombres: 'Cristiano',
  apellidos: 'Ronaldo',
  edad: 41,
  posicion: 'Delantero centro',
  estatura: 187,
  peso: 83,
  camiseta: 7,
  foto: 'https://ui-avatars.com/api/?name=Cristiano+Ronaldo&background=123d25&color=fff'
},
{
  nombres: 'Kylian',
  apellidos: 'Mbappé',
  edad: 27,
  posicion: 'Extremo izquierdo',
  estatura: 178,
  peso: 75,
  camiseta: 9,
  foto: 'https://ui-avatars.com/api/?name=Kylian+Mbappe&background=123d25&color=fff'
},
{
  nombres: 'Erling',
  apellidos: 'Haaland',
  edad: 25,
  posicion: 'Delantero centro',
  estatura: 194,
  peso: 88,
  camiseta: 11,
  foto: 'https://ui-avatars.com/api/?name=Erling+Haaland&background=123d25&color=fff'
},
{
  nombres: 'Kevin',
  apellidos: 'De Bruyne',
  edad: 34,
  posicion: 'Mediocampista ofensivo',
  estatura: 181,
  peso: 70,
  camiseta: 17,
  foto: 'https://ui-avatars.com/api/?name=Kevin+De+Bruyne&background=123d25&color=fff'
},
{
  nombres: 'Luka',
  apellidos: 'Modrić',
  edad: 40,
  posicion: 'Mediocampista central',
  estatura: 172,
  peso: 66,
  camiseta: 8,
  foto: 'https://ui-avatars.com/api/?name=Luka+Modric&background=123d25&color=fff'
},
{
  nombres: 'Neymar',
  apellidos: 'Júnior',
  edad: 34,
  posicion: 'Mediapunta',
  estatura: 175,
  peso: 68,
  camiseta:  69,
  foto: 'https://ui-avatars.com/api/?name=Neymar+Junior&background=123d25&color=fff'
},
{
  nombres: 'Virgil',
  apellidos: 'van Dijk',
  edad: 34,
  posicion: 'Defensa central',
  estatura: 195,
  peso: 92,
  camiseta: 4,
  foto: 'https://ui-avatars.com/api/?name=Virgil+van+Dijk&background=123d25&color=fff'
},
{
  nombres: 'Sergio',
  apellidos: 'Ramos',
  edad: 40,
  posicion: 'Defensa central',
  estatura: 184,
  peso: 82,
  camiseta: 5,
  foto: 'https://ui-avatars.com/api/?name=Sergio+Ramos&background=123d25&color=fff'
},
{
  nombres: 'Achraf',
  apellidos: 'Hakimi',
  edad: 27,
  posicion: 'Lateral derecho',
  estatura: 181,
  peso: 73,
  camiseta: 2,
  foto: 'https://ui-avatars.com/api/?name=Achraf+Hakimi&background=123d25&color=fff'
},
{
  nombres: 'Alphonso',
  apellidos: 'Davies',
  edad: 25,
  posicion: 'Lateral izquierdo',
  estatura: 183,
  peso: 75,
  camiseta: 3,
  foto: 'https://ui-avatars.com/api/?name=Alphonso+Davies&background=123d25&color=fff'
},
{
  nombres: 'Thibaut',
  apellidos: 'Courtois',
  edad: 33,
  posicion: 'Portero',
  estatura: 200,
  peso: 96,
  camiseta: 1,
  foto: 'https://i.ibb.co/HfkbnBSd/Gemini-Generated-Image-l90fjjl90fjjl90f.png'
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

