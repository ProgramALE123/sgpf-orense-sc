import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jugador, JugadoresService } from '../../services/jugadores';
@Component({
  selector: 'app-jugadores',
  imports: [CommonModule, FormsModule],
  templateUrl: './jugadores.html',
  styleUrl: './jugadores.css',
})
export class Jugadores {
  mostrarFormulario: boolean = false;
  editando: boolean = false;
  indiceEditar: number = -1;

  jugador: Jugador = {
    nombres: '',
    apellidos: '',
    edad: 0,
    posicion: '',
    estatura: 0,
    peso: 0,
    camiseta: 0,
    foto: ''
  };
  jugadorSeleccionado: Jugador | null = null;
  mostrarDetalle: boolean = false;
  jugadores: Jugador[] = [];

  constructor(private jugadoresService: JugadoresService) {
    this.jugadores = this.jugadoresService.obtenerJugadores();
  }
  verMas(jugador: Jugador): void {
    this.jugadorSeleccionado = jugador;
    this.mostrarDetalle = true;
  }

  cerrarDetalle(): void {
    this.jugadorSeleccionado = null;
    this.mostrarDetalle = false;
  }
  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.limpiarFormulario();
  }

  guardarJugador(): void {
    if (this.editando) {
      this.jugadoresService.editarJugador(this.indiceEditar, this.jugador);
    } else {
      this.jugadoresService.agregarJugador(this.jugador);
    }

    this.jugadores = this.jugadoresService.obtenerJugadores();
    this.cerrarFormulario();
  }

  editarJugador(indice: number): void {
    this.jugador = { ...this.jugadores[indice] };
    this.indiceEditar = indice;
    this.editando = true;
    this.mostrarFormulario = true;
  }

  eliminarJugador(indice: number): void {
    this.jugadoresService.eliminarJugador(indice);
    this.jugadores = this.jugadoresService.obtenerJugadores();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.indiceEditar = -1;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.jugador = {
      nombres: '',
      apellidos: '',
      edad: 0,
      posicion: '',
      estatura: 0,
      peso: 0,
      camiseta: 0,
      foto: ''
    };
  }
}
