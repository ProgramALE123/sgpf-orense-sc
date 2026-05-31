import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntrenadoresService {
   private entrenadores: Entrenador[] = [
    {
      nombres: 'Juan',
      apellidos: 'Pérez',
      cedula: '0700000001',
      telefono: '0999999991',
      correo: 'juan.perez@orense.com',
      cargo: 'Director Técnico',
      foto: 'https://ui-avatars.com/api/?name=Juan+Perez&background=123d25&color=fff'
    },
    {
      nombres: 'Carlos',
      apellidos: 'Ramírez',
      cedula: '0700000002',
      telefono: '0999999992',
      correo: 'carlos.ramirez@orense.com',
      cargo: 'Asistente Técnico',
      foto: 'https://ui-avatars.com/api/?name=Carlos+Ramirez&background=123d25&color=fff'
    },
    {
      nombres: 'Miguel',
      apellidos: 'Torres',
      cedula: '0700000003',
      telefono: '0999999993',
      correo: 'miguel.torres@orense.com',
      cargo: 'Preparador Físico',
      foto: 'https://ui-avatars.com/api/?name=Miguel+Torres&background=123d25&color=fff'
    }
  ];

  obtenerEntrenadores(): Entrenador[] {
    return this.entrenadores;
  }

  obtenerTotalEntrenadores(): number {
    return this.entrenadores.length;
  }

  agregarEntrenador(entrenador: Entrenador): void {
    this.entrenadores.push({ ...entrenador });
  }

  editarEntrenador(indice: number, entrenador: Entrenador): void {
    this.entrenadores[indice] = { ...entrenador };
  }

  eliminarEntrenador(indice: number): void {
    this.entrenadores.splice(indice, 1);
  }
}

export interface Entrenador {
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  correo: string;
  cargo: string;
  foto: string;
}
