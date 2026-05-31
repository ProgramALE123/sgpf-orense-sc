import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jugador, JugadoresService } from '../../services/jugadores';
import { Partido, PartidosService } from '../../services/partidos';
import { Alineacion, AlineacionesService, JugadorEnCancha } from '../../services/alineaciones';

export interface PosicionCancha {
  x: number;
  y: number;
}

@Component({
  selector: 'app-alineaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './alineaciones.html',
  styleUrl: './alineaciones.css',
})
export class Alineaciones implements OnInit {
  // ─── Datos ───────────────────────────────────────────────
  jugadores: Jugador[] = [];
  partidos: Partido[] = [];
  alineaciones: Alineacion[] = [];

  // ─── Estado UI ───────────────────────────────────────────
  vista: 'lista' | 'editor' = 'lista';
  editandoId: number | null = null;
  alineacionExpandidaId: number | null = null;

  // ─── Editor activo ───────────────────────────────────────
  formacionSeleccionada: string = '4-4-2';
  partidoSeleccionadoIdx: number = -1;
  jugadoresEnCancha: JugadorEnCancha[] = [];

  // ─── Drag & drop ─────────────────────────────────────────
  draggingFromBanquillo: Jugador | null = null;
  draggingFromCancha: JugadorEnCancha | null = null;
  isDraggingOver: boolean = false;

  // ─── Formaciones disponibles ─────────────────────────────
  formaciones: string[] = ['4-4-2', '4-3-3', '3-5-2', '4-2-3-1', '5-3-2', '3-4-3'];

  // ─── Posiciones por formación ────────────────────────────
  posicionesPorFormacion: Record<string, { x: number; y: number; rol: string; label: string }[]> = {
    '4-4-2': [
      { x: 50, y: 88, rol: 'Portero',        label: 'POR' },
      { x: 18, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 38, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 62, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 82, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 18, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 38, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 62, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 82, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 35, y: 22, rol: 'Delantero',       label: 'DEL' },
      { x: 65, y: 22, rol: 'Delantero',       label: 'DEL' },
    ],
    '4-3-3': [
      { x: 50, y: 88, rol: 'Portero',        label: 'POR' },
      { x: 18, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 38, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 62, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 82, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 28, y: 46, rol: 'Mediocampista',   label: 'MED' },
      { x: 50, y: 46, rol: 'Mediocampista',   label: 'MED' },
      { x: 72, y: 46, rol: 'Mediocampista',   label: 'MED' },
      { x: 20, y: 20, rol: 'Delantero',       label: 'DEL' },
      { x: 50, y: 16, rol: 'Delantero',       label: 'DEL' },
      { x: 80, y: 20, rol: 'Delantero',       label: 'DEL' },
    ],
    '3-5-2': [
      { x: 50, y: 88, rol: 'Portero',        label: 'POR' },
      { x: 28, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 50, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 72, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 10, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 30, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 50, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 70, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 90, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 35, y: 22, rol: 'Delantero',       label: 'DEL' },
      { x: 65, y: 22, rol: 'Delantero',       label: 'DEL' },
    ],
    '4-2-3-1': [
      { x: 50, y: 88, rol: 'Portero',        label: 'POR' },
      { x: 18, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 38, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 62, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 82, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 35, y: 54, rol: 'Mediocampista',   label: 'MED' },
      { x: 65, y: 54, rol: 'Mediocampista',   label: 'MED' },
      { x: 20, y: 36, rol: 'Mediocampista',   label: 'MED' },
      { x: 50, y: 36, rol: 'Mediocampista',   label: 'MED' },
      { x: 80, y: 36, rol: 'Mediocampista',   label: 'MED' },
      { x: 50, y: 16, rol: 'Delantero',       label: 'DEL' },
    ],
    '5-3-2': [
      { x: 50, y: 88, rol: 'Portero',        label: 'POR' },
      { x: 10, y: 68, rol: 'Defensa',         label: 'DEF' },
      { x: 30, y: 72, rol: 'Defensa',         label: 'DEF' },
      { x: 50, y: 72, rol: 'Defensa',         label: 'DEF' },
      { x: 70, y: 72, rol: 'Defensa',         label: 'DEF' },
      { x: 90, y: 68, rol: 'Defensa',         label: 'DEF' },
      { x: 28, y: 46, rol: 'Mediocampista',   label: 'MED' },
      { x: 50, y: 46, rol: 'Mediocampista',   label: 'MED' },
      { x: 72, y: 46, rol: 'Mediocampista',   label: 'MED' },
      { x: 35, y: 22, rol: 'Delantero',       label: 'DEL' },
      { x: 65, y: 22, rol: 'Delantero',       label: 'DEL' },
    ],
    '3-4-3': [
      { x: 50, y: 88, rol: 'Portero',        label: 'POR' },
      { x: 28, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 50, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 72, y: 70, rol: 'Defensa',         label: 'DEF' },
      { x: 15, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 38, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 62, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 85, y: 48, rol: 'Mediocampista',   label: 'MED' },
      { x: 20, y: 20, rol: 'Delantero',       label: 'DEL' },
      { x: 50, y: 16, rol: 'Delantero',       label: 'DEL' },
      { x: 80, y: 20, rol: 'Delantero',       label: 'DEL' },
    ],
  };

  constructor(
    private jugadoresService: JugadoresService,
    private partidosService: PartidosService,
    private alineacionesService: AlineacionesService
  ) {}

  ngOnInit(): void {
    this.jugadores = this.jugadoresService.obtenerJugadores();
    this.partidos  = this.partidosService.obtenerPartidos();
    this.alineaciones = this.alineacionesService.obtenerAlineaciones();
  }

  // ─── Partidos PROGRAMADOS (sin resultado) — para el editor ───
  get partidosProgramados(): Partido[] {
    return this.partidos.filter(p => p.resultado.trim() === '');
  }

  // ─── Jugadores disponibles (no en cancha) ─────────────────
  get jugadoresDisponibles(): Jugador[] {
    const enCancha = this.jugadoresEnCancha.map(j => j.jugador.camiseta);
    return this.jugadores.filter(j => !enCancha.includes(j.camiseta));
  }

  get slotsTotales(): number {
    return (this.posicionesPorFormacion[this.formacionSeleccionada] || []).length;
  }

  get slotsOcupados(): number {
    return this.jugadoresEnCancha.length;
  }

  get partidoActual(): Partido | null {
    return this.partidoSeleccionadoIdx >= 0
      ? this.partidosProgramados[this.partidoSeleccionadoIdx]
      : null;
  }

  // ─── Toggle mini-cancha en lista ──────────────────────────
  toggleExpandir(id: number): void {
    this.alineacionExpandidaId = this.alineacionExpandidaId === id ? null : id;
  }

  estaExpandida(id: number): boolean {
    return this.alineacionExpandidaId === id;
  }

  // ─── Slots para mini-cancha de solo lectura ───────────────
  slotsDeFormacion(formacion: string): { x: number; y: number; rol: string; label: string }[] {
    return this.posicionesPorFormacion[formacion] || [];
  }

  jugadorEnSlotDeAlineacion(alineacion: Alineacion, slotIdx: number): JugadorEnCancha | null {
    const slots = this.posicionesPorFormacion[alineacion.formacion];
    if (!slots) return null;
    const slot = slots[slotIdx];
    return alineacion.jugadoresEnCancha.find(
      j => Math.abs(j.posicion.x - slot.x) < 1 && Math.abs(j.posicion.y - slot.y) < 1
    ) ?? null;
  }

  // ─── Obtener jugador en slot del editor ───────────────────
  jugadorEnSlot(idx: number): JugadorEnCancha | null {
    const slot = this.posicionesPorFormacion[this.formacionSeleccionada][idx];
    return this.jugadoresEnCancha.find(
      j => Math.abs(j.posicion.x - slot.x) < 1 && Math.abs(j.posicion.y - slot.y) < 1
    ) ?? null;
  }

  // ─── Cambio de formación ──────────────────────────────────
  cambiarFormacion(): void {
    const nuevosSlots = this.posicionesPorFormacion[this.formacionSeleccionada];
    const jugadoresActuales = [...this.jugadoresEnCancha];
    this.jugadoresEnCancha = [];
    jugadoresActuales.forEach((jec, i) => {
      if (i < nuevosSlots.length) {
        this.jugadoresEnCancha.push({
          jugador: jec.jugador,
          posicion: { x: nuevosSlots[i].x, y: nuevosSlots[i].y },
          rol: nuevosSlots[i].rol,
        });
      }
    });
  }

  // ─── Drag & drop ─────────────────────────────────────────
  onDragStartBanquillo(jugador: Jugador): void {
    this.draggingFromBanquillo = jugador;
    this.draggingFromCancha = null;
  }

  onDragStartCancha(jec: JugadorEnCancha): void {
    this.draggingFromCancha = jec;
    this.draggingFromBanquillo = null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeave(): void {
    this.isDraggingOver = false;
  }

  onDropEnSlot(event: DragEvent, slotIdx: number): void {
    event.preventDefault();
    this.isDraggingOver = false;
    const slot = this.posicionesPorFormacion[this.formacionSeleccionada][slotIdx];
    const yaOcupado = this.jugadorEnSlot(slotIdx);

    if (this.draggingFromBanquillo) {
      if (yaOcupado) {
        this.jugadoresEnCancha = this.jugadoresEnCancha.filter(j => j !== yaOcupado);
      }
      this.jugadoresEnCancha.push({
        jugador: this.draggingFromBanquillo,
        posicion: { x: slot.x, y: slot.y },
        rol: slot.rol,
      });
    } else if (this.draggingFromCancha) {
      if (yaOcupado && yaOcupado !== this.draggingFromCancha) {
        yaOcupado.posicion = { ...this.draggingFromCancha.posicion };
        yaOcupado.rol = this.draggingFromCancha.rol;
      }
      this.draggingFromCancha.posicion = { x: slot.x, y: slot.y };
      this.draggingFromCancha.rol = slot.rol;
    }

    this.draggingFromBanquillo = null;
    this.draggingFromCancha = null;
  }

  onDropEnBanquillo(event: DragEvent): void {
    event.preventDefault();
    if (this.draggingFromCancha) {
      this.jugadoresEnCancha = this.jugadoresEnCancha.filter(j => j !== this.draggingFromCancha);
    }
    this.draggingFromBanquillo = null;
    this.draggingFromCancha = null;
  }

  quitarDeCancha(jec: JugadorEnCancha): void {
    this.jugadoresEnCancha = this.jugadoresEnCancha.filter(j => j !== jec);
  }

  limpiarCancha(): void {
    this.jugadoresEnCancha = [];
  }

  // ─── Guardar alineación ──────────────────────────────────
  guardarAlineacion(): void {
    if (this.slotsOcupados === 0) return;

    const datos = {
      partido: this.partidoActual!,
      formacion: this.formacionSeleccionada,
      jugadoresEnCancha: [...this.jugadoresEnCancha],
      fechaCreacion: new Date().toLocaleDateString('es-EC'),
    };

    if (this.editandoId !== null) {
      const original = this.alineacionesService.obtenerPorId(this.editandoId);
      this.alineacionesService.editar(this.editandoId, {
        ...datos,
        fechaCreacion: original?.fechaCreacion ?? datos.fechaCreacion,
      });
    } else {
      this.alineacionesService.agregar(datos);
    }

    this.alineaciones = this.alineacionesService.obtenerAlineaciones();
    this.vista = 'lista';
    this.editandoId = null;
    this.resetEditor();
  }

  // ─── Nueva alineación ────────────────────────────────────
  nuevaAlineacion(): void {
    this.resetEditor();
    this.editandoId = null;
    this.vista = 'editor';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Editar alineación guardada ──────────────────────────
  editarAlineacion(alineacion: Alineacion): void {
    this.formacionSeleccionada = alineacion.formacion;
    this.jugadoresEnCancha = alineacion.jugadoresEnCancha.map(j => ({ ...j }));
    const pIdx = this.partidosProgramados.findIndex(
      p => p.rival === alineacion.partido?.rival && p.fecha === alineacion.partido?.fecha
    );
    this.partidoSeleccionadoIdx = pIdx;
    this.editandoId = alineacion.id;
    this.vista = 'editor';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Eliminar alineación ──────────────────────────────────
  eliminarAlineacion(id: number): void {
    this.alineacionesService.eliminar(id);
    this.alineaciones = this.alineacionesService.obtenerAlineaciones();
    if (this.alineacionExpandidaId === id) this.alineacionExpandidaId = null;
  }

  cancelarEditor(): void {
    this.vista = 'lista';
    this.editandoId = null;
    this.resetEditor();
  }

  private resetEditor(): void {
    this.formacionSeleccionada = '4-4-2';
    this.jugadoresEnCancha = [];
    this.partidoSeleccionadoIdx = -1;
  }

  // ─── Helpers ─────────────────────────────────────────────
  colorRol(rol: string): string {
    const mapa: Record<string, string> = {
      Portero: '#f4a900',
      Defensa: '#1a6b3c',
      Mediocampista: '#2e86de',
      Delantero: '#c0392b',
    };
    return mapa[rol] ?? '#555';
  }

  iniciales(jugador: Jugador): string {
    return (jugador.nombres[0] + jugador.apellidos[0]).toUpperCase();
  }
}