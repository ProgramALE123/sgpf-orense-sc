import { Injectable } from '@angular/core';
import { Jugador } from './jugadores';
import { Partido } from './partidos';

export interface JugadorEnCancha {
  jugador: Jugador;
  posicion: { x: number; y: number };
  rol: string;
}

export interface Alineacion {
  id: number;
  partido: Partido;
  formacion: string;
  jugadoresEnCancha: JugadorEnCancha[];
  fechaCreacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlineacionesService {
  private alineaciones: Alineacion[] = [
    {
      id: 1,
      partido: {
        rival: 'Deportivo Cuenca',
        fecha: '2026-03-15',
        lugar: 'Estadio 9 de Mayo, Machala',
        resultado: '2-1',
        torneo: 'Liga Pro Serie A',
        condicion: 'Local',
      },
      formacion: '4-4-2',
      fechaCreacion: '14/03/2026',
      jugadoresEnCancha: [
        { jugador: { nombres: 'Thibaut',   apellidos: 'Courtois',   edad: 33, posicion: 'Portero',           estatura: 200, peso: 96, camiseta: 1,  foto: 'https://ui-avatars.com/api/?name=Thibaut+Courtois&background=123d25&color=fff'  }, posicion: { x: 50, y: 88 }, rol: 'Portero' },
        { jugador: { nombres: 'Achraf',    apellidos: 'Hakimi',     edad: 27, posicion: 'Lateral derecho',   estatura: 181, peso: 73, camiseta: 2,  foto: 'https://ui-avatars.com/api/?name=Achraf+Hakimi&background=123d25&color=fff'    }, posicion: { x: 18, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Virgil',    apellidos: 'van Dijk',   edad: 34, posicion: 'Defensa central',   estatura: 195, peso: 92, camiseta: 4,  foto: 'https://ui-avatars.com/api/?name=Virgil+van+Dijk&background=123d25&color=fff'  }, posicion: { x: 38, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Sergio',    apellidos: 'Ramos',      edad: 40, posicion: 'Defensa central',   estatura: 184, peso: 82, camiseta: 5,  foto: 'https://ui-avatars.com/api/?name=Sergio+Ramos&background=123d25&color=fff'     }, posicion: { x: 62, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Alphonso',  apellidos: 'Davies',     edad: 25, posicion: 'Lateral izquierdo', estatura: 183, peso: 75, camiseta: 3,  foto: 'https://ui-avatars.com/api/?name=Alphonso+Davies&background=123d25&color=fff'  }, posicion: { x: 82, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Luka',      apellidos: 'Modrić',     edad: 40, posicion: 'Mediocampista',     estatura: 172, peso: 66, camiseta: 8,  foto: 'https://ui-avatars.com/api/?name=Luka+Modric&background=123d25&color=fff'      }, posicion: { x: 18, y: 48 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Kevin',     apellidos: 'De Bruyne',  edad: 34, posicion: 'Mediocampista',     estatura: 181, peso: 70, camiseta: 17, foto: 'https://ui-avatars.com/api/?name=Kevin+De+Bruyne&background=123d25&color=fff'  }, posicion: { x: 38, y: 48 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Fernando',  apellidos: 'Gaibor',     edad: 32, posicion: 'Mediocampista',     estatura: 178, peso: 76, camiseta: 8,  foto: 'https://ui-avatars.com/api/?name=Fernando+Gaibor&background=123d25&color=fff' }, posicion: { x: 62, y: 48 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Gabriel',   apellidos: 'Achilier',   edad: 39, posicion: 'Mediocampista',     estatura: 181, peso: 80, camiseta: 24, foto: 'https://ui-avatars.com/api/?name=Gabriel+Achilier&background=123d25&color=fff' }, posicion: { x: 82, y: 48 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Fidel',     apellidos: 'Martínez',   edad: 34, posicion: 'Delantero',         estatura: 175, peso: 72, camiseta: 51, foto: 'https://ui-avatars.com/api/?name=Fidel+Martinez&background=123d25&color=fff'  }, posicion: { x: 35, y: 22 }, rol: 'Delantero' },
        { jugador: { nombres: 'Erling',    apellidos: 'Haaland',    edad: 25, posicion: 'Delantero',         estatura: 194, peso: 88, camiseta: 11, foto: 'https://ui-avatars.com/api/?name=Erling+Haaland&background=123d25&color=fff'  }, posicion: { x: 65, y: 22 }, rol: 'Delantero' },
      ],
    },
    {
      id: 2,
      partido: {
        rival: 'Barcelona SC',
        fecha: '2026-03-22',
        lugar: 'Estadio Monumental, Guayaquil',
        resultado: '0-0',
        torneo: 'Liga Pro Serie A',
        condicion: 'Visitante',
      },
      formacion: '4-3-3',
      fechaCreacion: '21/03/2026',
      jugadoresEnCancha: [
        { jugador: { nombres: 'Thibaut',   apellidos: 'Courtois',  edad: 33, posicion: 'Portero',           estatura: 200, peso: 96, camiseta: 1,  foto: 'https://ui-avatars.com/api/?name=Thibaut+Courtois&background=123d25&color=fff' }, posicion: { x: 50, y: 88 }, rol: 'Portero' },
        { jugador: { nombres: 'Achraf',    apellidos: 'Hakimi',    edad: 27, posicion: 'Lateral derecho',   estatura: 181, peso: 73, camiseta: 2,  foto: 'https://ui-avatars.com/api/?name=Achraf+Hakimi&background=123d25&color=fff'   }, posicion: { x: 18, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Virgil',    apellidos: 'van Dijk',  edad: 34, posicion: 'Defensa central',   estatura: 195, peso: 92, camiseta: 4,  foto: 'https://ui-avatars.com/api/?name=Virgil+van+Dijk&background=123d25&color=fff' }, posicion: { x: 38, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Sergio',    apellidos: 'Ramos',     edad: 40, posicion: 'Defensa central',   estatura: 184, peso: 82, camiseta: 5,  foto: 'https://ui-avatars.com/api/?name=Sergio+Ramos&background=123d25&color=fff'    }, posicion: { x: 62, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Alphonso',  apellidos: 'Davies',    edad: 25, posicion: 'Lateral izquierdo', estatura: 183, peso: 75, camiseta: 3,  foto: 'https://ui-avatars.com/api/?name=Alphonso+Davies&background=123d25&color=fff' }, posicion: { x: 82, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Luka',      apellidos: 'Modrić',    edad: 40, posicion: 'Mediocampista',     estatura: 172, peso: 66, camiseta: 8,  foto: 'https://ui-avatars.com/api/?name=Luka+Modric&background=123d25&color=fff'     }, posicion: { x: 28, y: 46 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Kevin',     apellidos: 'De Bruyne', edad: 34, posicion: 'Mediocampista',     estatura: 181, peso: 70, camiseta: 17, foto: 'https://ui-avatars.com/api/?name=Kevin+De+Bruyne&background=123d25&color=fff' }, posicion: { x: 50, y: 46 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Fernando',  apellidos: 'Gaibor',    edad: 32, posicion: 'Mediocampista',     estatura: 178, peso: 76, camiseta: 8,  foto: 'https://ui-avatars.com/api/?name=Fernando+Gaibor&background=123d25&color=fff'}, posicion: { x: 72, y: 46 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Kylian',    apellidos: 'Mbappé',    edad: 27, posicion: 'Delantero',         estatura: 178, peso: 75, camiseta: 9,  foto: 'https://ui-avatars.com/api/?name=Kylian+Mbappe&background=123d25&color=fff'  }, posicion: { x: 20, y: 20 }, rol: 'Delantero' },
        { jugador: { nombres: 'Lionel',    apellidos: 'Messi',     edad: 38, posicion: 'Delantero',         estatura: 170, peso: 72, camiseta: 10, foto: 'https://ui-avatars.com/api/?name=Lionel+Messi&background=123d25&color=fff'   }, posicion: { x: 50, y: 16 }, rol: 'Delantero' },
        { jugador: { nombres: 'Fidel',     apellidos: 'Martínez',  edad: 34, posicion: 'Delantero',         estatura: 175, peso: 72, camiseta: 51, foto: 'https://ui-avatars.com/api/?name=Fidel+Martinez&background=123d25&color=fff' }, posicion: { x: 80, y: 20 }, rol: 'Delantero' },
      ],
    },
    {
      id: 3,
      partido: {
        rival: 'Aucas',
        fecha: '2026-04-05',
        lugar: 'Estadio 9 de Mayo, Machala',
        resultado: '3-0',
        torneo: 'Liga Pro Serie A',
        condicion: 'Local',
      },
      formacion: '4-2-3-1',
      fechaCreacion: '04/04/2026',
      jugadoresEnCancha: [
        { jugador: { nombres: 'Thibaut',   apellidos: 'Courtois',  edad: 33, posicion: 'Portero',           estatura: 200, peso: 96, camiseta: 1,  foto: 'https://ui-avatars.com/api/?name=Thibaut+Courtois&background=123d25&color=fff' }, posicion: { x: 50, y: 88 }, rol: 'Portero' },
        { jugador: { nombres: 'Achraf',    apellidos: 'Hakimi',    edad: 27, posicion: 'Lateral derecho',   estatura: 181, peso: 73, camiseta: 2,  foto: 'https://ui-avatars.com/api/?name=Achraf+Hakimi&background=123d25&color=fff'   }, posicion: { x: 18, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Virgil',    apellidos: 'van Dijk',  edad: 34, posicion: 'Defensa central',   estatura: 195, peso: 92, camiseta: 4,  foto: 'https://ui-avatars.com/api/?name=Virgil+van+Dijk&background=123d25&color=fff' }, posicion: { x: 38, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Sergio',    apellidos: 'Ramos',     edad: 40, posicion: 'Defensa central',   estatura: 184, peso: 82, camiseta: 5,  foto: 'https://ui-avatars.com/api/?name=Sergio+Ramos&background=123d25&color=fff'    }, posicion: { x: 62, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Alphonso',  apellidos: 'Davies',    edad: 25, posicion: 'Lateral izquierdo', estatura: 183, peso: 75, camiseta: 3,  foto: 'https://ui-avatars.com/api/?name=Alphonso+Davies&background=123d25&color=fff' }, posicion: { x: 82, y: 70 }, rol: 'Defensa' },
        { jugador: { nombres: 'Luka',      apellidos: 'Modrić',    edad: 40, posicion: 'Mediocampista',     estatura: 172, peso: 66, camiseta: 8,  foto: 'https://ui-avatars.com/api/?name=Luka+Modric&background=123d25&color=fff'     }, posicion: { x: 35, y: 54 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Kevin',     apellidos: 'De Bruyne', edad: 34, posicion: 'Mediocampista',     estatura: 181, peso: 70, camiseta: 17, foto: 'https://ui-avatars.com/api/?name=Kevin+De+Bruyne&background=123d25&color=fff' }, posicion: { x: 65, y: 54 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Neymar',    apellidos: 'Júnior',    edad: 34, posicion: 'Mediocampista',     estatura: 175, peso: 68, camiseta: 69, foto: 'https://ui-avatars.com/api/?name=Neymar+Junior&background=123d25&color=fff'  }, posicion: { x: 20, y: 36 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Fernando',  apellidos: 'Gaibor',    edad: 32, posicion: 'Mediocampista',     estatura: 178, peso: 76, camiseta: 8,  foto: 'https://ui-avatars.com/api/?name=Fernando+Gaibor&background=123d25&color=fff'}, posicion: { x: 50, y: 36 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Lionel',    apellidos: 'Messi',     edad: 38, posicion: 'Mediocampista',     estatura: 170, peso: 72, camiseta: 10, foto: 'https://ui-avatars.com/api/?name=Lionel+Messi&background=123d25&color=fff'   }, posicion: { x: 80, y: 36 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Fidel',     apellidos: 'Martínez',  edad: 34, posicion: 'Delantero',         estatura: 175, peso: 72, camiseta: 51, foto: 'https://ui-avatars.com/api/?name=Fidel+Martinez&background=123d25&color=fff' }, posicion: { x: 50, y: 16 }, rol: 'Delantero' },
      ],
    },
    {
      id: 4,
      partido: {
        rival: 'Emelec',
        fecha: '2026-04-19',
        lugar: 'Estadio Capwell, Guayaquil',
        resultado: '1-2',
        torneo: 'Copa Ecuador',
        condicion: 'Visitante',
      },
      formacion: '5-3-2',
      fechaCreacion: '18/04/2026',
      jugadoresEnCancha: [
        { jugador: { nombres: 'Thibaut',   apellidos: 'Courtois',  edad: 33, posicion: 'Portero',           estatura: 200, peso: 96, camiseta: 1,  foto: 'https://ui-avatars.com/api/?name=Thibaut+Courtois&background=123d25&color=fff' }, posicion: { x: 50, y: 88 }, rol: 'Portero' },
        { jugador: { nombres: 'Gabriel',   apellidos: 'Achilier',  edad: 39, posicion: 'Defensa',           estatura: 181, peso: 80, camiseta: 24, foto: 'https://ui-avatars.com/api/?name=Gabriel+Achilier&background=123d25&color=fff'}, posicion: { x: 10, y: 68 }, rol: 'Defensa' },
        { jugador: { nombres: 'Virgil',    apellidos: 'van Dijk',  edad: 34, posicion: 'Defensa central',   estatura: 195, peso: 92, camiseta: 4,  foto: 'https://ui-avatars.com/api/?name=Virgil+van+Dijk&background=123d25&color=fff' }, posicion: { x: 30, y: 72 }, rol: 'Defensa' },
        { jugador: { nombres: 'Sergio',    apellidos: 'Ramos',     edad: 40, posicion: 'Defensa central',   estatura: 184, peso: 82, camiseta: 5,  foto: 'https://ui-avatars.com/api/?name=Sergio+Ramos&background=123d25&color=fff'    }, posicion: { x: 50, y: 72 }, rol: 'Defensa' },
        { jugador: { nombres: 'Achraf',    apellidos: 'Hakimi',    edad: 27, posicion: 'Lateral derecho',   estatura: 181, peso: 73, camiseta: 2,  foto: 'https://ui-avatars.com/api/?name=Achraf+Hakimi&background=123d25&color=fff'   }, posicion: { x: 70, y: 72 }, rol: 'Defensa' },
        { jugador: { nombres: 'Alphonso',  apellidos: 'Davies',    edad: 25, posicion: 'Lateral izquierdo', estatura: 183, peso: 75, camiseta: 3,  foto: 'https://ui-avatars.com/api/?name=Alphonso+Davies&background=123d25&color=fff' }, posicion: { x: 90, y: 68 }, rol: 'Defensa' },
        { jugador: { nombres: 'Luka',      apellidos: 'Modrić',    edad: 40, posicion: 'Mediocampista',     estatura: 172, peso: 66, camiseta: 8,  foto: 'https://ui-avatars.com/api/?name=Luka+Modric&background=123d25&color=fff'     }, posicion: { x: 28, y: 46 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Kevin',     apellidos: 'De Bruyne', edad: 34, posicion: 'Mediocampista',     estatura: 181, peso: 70, camiseta: 17, foto: 'https://ui-avatars.com/api/?name=Kevin+De+Bruyne&background=123d25&color=fff' }, posicion: { x: 50, y: 46 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Fernando',  apellidos: 'Gaibor',    edad: 32, posicion: 'Mediocampista',     estatura: 178, peso: 76, camiseta: 8,  foto: 'https://ui-avatars.com/api/?name=Fernando+Gaibor&background=123d25&color=fff'}, posicion: { x: 72, y: 46 }, rol: 'Mediocampista' },
        { jugador: { nombres: 'Fidel',     apellidos: 'Martínez',  edad: 34, posicion: 'Delantero',         estatura: 175, peso: 72, camiseta: 51, foto: 'https://ui-avatars.com/api/?name=Fidel+Martinez&background=123d25&color=fff' }, posicion: { x: 35, y: 22 }, rol: 'Delantero' },
        { jugador: { nombres: 'Erling',    apellidos: 'Haaland',   edad: 25, posicion: 'Delantero',         estatura: 194, peso: 88, camiseta: 11, foto: 'https://ui-avatars.com/api/?name=Erling+Haaland&background=123d25&color=fff' }, posicion: { x: 65, y: 22 }, rol: 'Delantero' },
      ],
    },
  ];

  private nextId = 5;

  /** Todas las alineaciones guardadas */
  obtenerAlineaciones(): Alineacion[] {
    return [...this.alineaciones];
  }

  /** Solo alineaciones de partidos ya jugados (con resultado) */
  obtenerAlineacionesJugadas(): Alineacion[] {
    return this.alineaciones.filter(a => a.partido.resultado.trim() !== '');
  }

  /** Buscar por id */
  obtenerPorId(id: number): Alineacion | undefined {
    return this.alineaciones.find(a => a.id === id);
  }

  agregar(alineacion: Omit<Alineacion, 'id'>): Alineacion {
    const nueva: Alineacion = { ...alineacion, id: this.nextId++ };
    this.alineaciones.push(nueva);
    return nueva;
  }

  editar(id: number, datos: Omit<Alineacion, 'id'>): void {
    const idx = this.alineaciones.findIndex(a => a.id === id);
    if (idx !== -1) this.alineaciones[idx] = { ...datos, id };
  }

  eliminar(id: number): void {
    this.alineaciones = this.alineaciones.filter(a => a.id !== id);
  }
}