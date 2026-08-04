import { ChangeDetectorRef, Component } from '@angular/core';
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
    foto: '', estado: 'Disponible', condicionFisica: 100, observacionesMedicas: ''
  };
  jugadorSeleccionado: Jugador | null = null;
  mostrarDetalle: boolean = false;
  jugadores: Jugador[] = [];
  filtroEstado: string = 'Todos';
  mensajeError = '';
  guardando = false;
  readonly posiciones = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];

  get jugadoresFiltrados(): Jugador[] { return this.filtroEstado === 'Todos' ? this.jugadores : this.jugadores.filter(j => j.estado === this.filtroEstado); }
  get disponibles(): number { return this.jugadores.filter(j => j.estado === 'Disponible').length; }
  get siguienteDorsalDisponible(): number {
    const ocupados = new Set(this.jugadores.map(j => Number(j.camiseta)));
    for (let dorsal = 1; dorsal <= 99; dorsal++) if (!ocupados.has(dorsal)) return dorsal;
    return 0;
  }
  claseEstado(estado: string): string { return ({ Disponible: 'estado-disponible', Lesionado: 'estado-lesionado', Suspendido: 'estado-suspendido', Recuperacion: 'estado-recuperacion' } as Record<string,string>)[estado] || ''; }

  constructor(private jugadoresService: JugadoresService, private cdr: ChangeDetectorRef) { this.cargarJugadores(); }
  cargarJugadores(): void { this.jugadoresService.obtenerJugadores().subscribe({ next: jugadores => { this.jugadores = jugadores; this.cdr.detectChanges(); }, error: error => console.error('Error al cargar jugadores', error) }); }
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
    this.mensajeError = '';
    this.limpiarFormulario();
    this.jugador.camiseta = this.siguienteDorsalDisponible;
  }

  guardarJugador(): void {
    this.mensajeError = '';
    const dorsal = Number(this.jugador.camiseta);
    const estatura = Number(this.jugador.estatura);
    const peso = Number(this.jugador.peso);
    if (!this.jugador.nombres.trim() || !this.jugador.apellidos.trim() ||
        !this.jugador.posicion || !Number.isInteger(dorsal) || dorsal < 1 || dorsal > 99 ||
        !Number.isInteger(estatura) || estatura < 120 || estatura > 230 ||
        !Number.isInteger(peso) || peso < 40 || peso > 180) {
      this.mensajeError = 'Completa nombres, apellidos, posición, dorsal (1-99), estatura en cm (120-230) y peso en kg (40-180).';
      return;
    }
    const dorsalRepetido = this.jugadores.some(j => Number(j.camiseta) === dorsal && j.id !== this.jugador.id);
    if (dorsalRepetido) {
      this.mensajeError = `El dorsal ${dorsal} ya está asignado. El siguiente disponible es ${this.siguienteDorsalDisponible}.`;
      return;
    }

    this.guardando = true;
    const peticion = this.editando
      ? this.jugadoresService.editarJugador(this.jugador)
      : this.jugadoresService.agregarJugador(this.jugador);
    peticion.subscribe({
      next: () => {
        this.guardando = false;
        this.cerrarFormulario();
        this.cargarJugadores();
      },
      error: error => {
        this.guardando = false;
        this.mensajeError = error?.error?.message || 'No se pudo guardar el jugador.';
        this.cdr.detectChanges();
      }
    });
  }

  editarJugadorSeleccionado(jugador: Jugador): void {
    this.jugador = { ...jugador };
    this.indiceEditar = this.jugadores.indexOf(jugador);
    this.editando = true;
    this.mostrarFormulario = true;
    this.mensajeError = '';
  }

  eliminarJugadorSeleccionado(jugador: Jugador): void {
    this.jugadoresService.eliminarJugador(jugador).subscribe(() => this.cargarJugadores());
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.indiceEditar = -1;
    this.mensajeError = '';
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
      foto: '', estado: 'Disponible', condicionFisica: 100, observacionesMedicas: ''
    };
  }
}
