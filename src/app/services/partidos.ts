import { Injectable } from '@angular/core';

export interface Partido {
  rival: string;
  fecha: string;
  lugar: string;
  resultado: string;
  torneo: string;
  condicion: 'Local' | 'Visitante';
}

@Injectable({
  providedIn: 'root',
})
export class PartidosService {
  private partidos: Partido[] = [
    {
      rival: 'Deportivo Cuenca',
      fecha: '2026-03-15',
      lugar: 'Estadio 9 de Mayo, Machala',
      resultado: '2-1',
      torneo: 'Liga Pro Serie A',
      condicion: 'Local',
    },
    {
      rival: 'Barcelona SC',
      fecha: '2026-03-22',
      lugar: 'Estadio Monumental, Guayaquil',
      resultado: '0-0',
      torneo: 'Liga Pro Serie A',
      condicion: 'Visitante',
    },
    {
      rival: 'Aucas',
      fecha: '2026-04-05',
      lugar: 'Estadio 9 de Mayo, Machala',
      resultado: '3-0',
      torneo: 'Liga Pro Serie A',
      condicion: 'Local',
    },
    {
      rival: 'Emelec',
      fecha: '2026-04-19',
      lugar: 'Estadio Capwell, Guayaquil',
      resultado: '1-2',
      torneo: 'Copa Ecuador',
      condicion: 'Visitante',
    },
    {
      rival: 'LDU Quito',
      fecha: '2026-06-10',
      lugar: 'Estadio 9 de Mayo, Machala',
      resultado: '',
      torneo: 'Liga Pro Serie A',
      condicion: 'Local',
    },
    {
      rival: 'Independiente del Valle',
      fecha: '2026-06-18',
      lugar: 'Estadio Rodrigo Paz Delgado, Quito',
      resultado: '',
      torneo: 'Liga Pro Serie A',
      condicion: 'Visitante',
    },
  ];

  obtenerPartidos(): Partido[] {
    return [...this.partidos].sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
  }

  obtenerTotalPartidos(): number {
    return this.partidos.length;
  }

  /** Últimos N partidos ya jugados (con resultado), ordenados del más reciente al más antiguo */
  obtenerUltimosJugados(n: number = 4): Partido[] {
    return this.partidos
      .filter((p) => p.resultado.trim() !== '')
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, n);
  }

  /** Próximos N partidos programados (sin resultado), ordenados del más próximo al más lejano */
  obtenerProximos(n: number = 3): Partido[] {
    return this.partidos
      .filter((p) => p.resultado.trim() === '')
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .slice(0, n);
  }

  agregarPartido(partido: Partido): void {
    this.partidos.push({ ...partido });
  }

  editarPartido(indice: number, partido: Partido): void {
    // indice sobre el array ordenado devuelto por obtenerPartidos()
    const ordenado = this.obtenerPartidos();
    const target = ordenado[indice];
    const realIdx = this.partidos.findIndex(
      (p) => p.rival === target.rival && p.fecha === target.fecha
    );
    if (realIdx !== -1) this.partidos[realIdx] = { ...partido };
  }

  eliminarPartido(indice: number): void {
    const ordenado = this.obtenerPartidos();
    const target = ordenado[indice];
    const realIdx = this.partidos.findIndex(
      (p) => p.rival === target.rival && p.fecha === target.fecha
    );
    if (realIdx !== -1) this.partidos.splice(realIdx, 1);
  }
}