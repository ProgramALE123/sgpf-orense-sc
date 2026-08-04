import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jugador, JugadoresService } from '../../services/jugadores';
import { Partido, PartidosService } from '../../services/partidos';
import { Alineacion, AlineacionesService, JugadorEnCancha } from '../../services/alineaciones';
import { finalize, Observable } from 'rxjs';

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
  editandoId: string | null = null;
  alineacionExpandidaId: string | null = null;

  // ─── Editor activo ───────────────────────────────────────
  formacionSeleccionada: string = '4-4-2';
  partidoSeleccionadoIdx: number = -1;
  jugadoresEnCancha: JugadorEnCancha[] = [];

  // ─── Drag & drop ─────────────────────────────────────────
  draggingFromBanquillo: Jugador | null = null;
  draggingFromCancha: JugadorEnCancha | null = null;
  private dragPreview: HTMLElement | null = null;
  jugadorTactilSeleccionado: Jugador | null = null;
  jugadorCanchaTactilSeleccionado: JugadorEnCancha | null = null;
  isDraggingOver: boolean = false;
  mensajePosicion: string = '';
  guardando: boolean = false;

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
    private alineacionesService: AlineacionesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.jugadoresService.obtenerJugadores().subscribe(jugadores => { this.jugadores = jugadores; this.cdr.detectChanges(); });
    this.partidosService.obtenerPartidos().subscribe(partidos => { this.partidos = partidos; this.cdr.detectChanges(); });
    this.cargarAlineaciones();
  }
  cargarAlineaciones(): void { this.alineacionesService.obtenerAlineaciones().subscribe({ next: alineaciones => { this.alineaciones = alineaciones.map(a => this.ordenarEnSlots(a)); this.cdr.detectChanges(); }, error: error => console.error('Error al cargar alineaciones', error) }); }

  // ─── Partidos PROGRAMADOS (sin resultado) — para el editor ───
  get partidosProgramados(): Partido[] {
    return this.partidos
      .filter(p => p.resultado.trim() === '')
      .filter(p => {
        const existente = this.alineaciones.find(a => a.partido?.id === p.id);
        return !existente || existente.id === this.editandoId;
      })
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  // ─── Jugadores disponibles (no en cancha) ─────────────────
  get jugadoresDisponibles(): Jugador[] {
    const enCancha = this.jugadoresEnCancha.map(j => j.jugador.camiseta);
    return this.jugadores.filter(j => !enCancha.includes(j.camiseta) && j.estado === 'Disponible');
  }

  get jugadoresNoConvocables(): Jugador[] { return this.jugadores.filter(j => j.estado !== 'Disponible'); }
  coberturaBanquillo(posicion: string): number { return this.jugadoresDisponibles.filter(j => j.posicion === posicion).length; }

  get slotsTotales(): number {
    return (this.posicionesPorFormacion[this.formacionSeleccionada] || []).length;
  }

  get slotsOcupados(): number {
    return this.posicionesPorFormacion[this.formacionSeleccionada].filter((_, i) => !!this.jugadorEnSlot(i)).length;
  }

  get partidoActual(): Partido | null {
    return this.partidoSeleccionadoIdx >= 0
      ? this.partidosProgramados[this.partidoSeleccionadoIdx]
      : null;
  }

  // ─── Toggle mini-cancha en lista ──────────────────────────
  toggleExpandir(id: string): void {
    this.alineacionExpandidaId = this.alineacionExpandidaId === id ? null : id;
  }

  estaExpandida(id: string): boolean {
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
    const usados = new Set<number>();
    const asignados = new Map<JugadorEnCancha, number>();
    const roles = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];

    // Reserva primero cada linea para jugadores de su posicion natural.
    for (const rol of roles) {
      const jugadoresRol = jugadoresActuales
        .filter(j => j.jugador.posicion === rol)
        .sort((a, b) => a.posicion.x - b.posicion.x);
      const slotsRol = nuevosSlots
        .map((slot, i) => ({ slot, i }))
        .filter(x => x.slot.rol === rol)
        .sort((a, b) => a.slot.x - b.slot.x);
      jugadoresRol.slice(0, slotsRol.length).forEach((jec, index) => {
        asignados.set(jec, slotsRol[index].i);
        usados.add(slotsRol[index].i);
      });
    }

    // Los jugadores de campo sobrantes van al espacio de campo mas cercano.
    for (const jec of jugadoresActuales) {
      if (asignados.has(jec) || jec.jugador.posicion === 'Portero') continue;
      const libres = nuevosSlots
        .map((slot, i) => ({ slot, i }))
        .filter(x => !usados.has(x.i) && x.slot.rol !== 'Portero')
        .sort((a, b) => Math.abs(a.slot.y - jec.posicion.y) + Math.abs(a.slot.x - jec.posicion.x) * .2 - (Math.abs(b.slot.y - jec.posicion.y) + Math.abs(b.slot.x - jec.posicion.x) * .2));
      if (libres.length) {
        asignados.set(jec, libres[0].i);
        usados.add(libres[0].i);
      }
    }

    this.jugadoresEnCancha = jugadoresActuales
      .filter(jec => asignados.has(jec))
      .map(jec => {
        const i = asignados.get(jec)!;
        return { ...jec, posicion: { x: nuevosSlots[i].x, y: nuevosSlots[i].y }, rol: nuevosSlots[i].rol, slotIndice: i };
      });

    const sinPortero = !this.jugadoresEnCancha.some(j => j.rol === 'Portero');
    const fueraPosicion = this.jugadoresEnCancha.filter(j => this.fueraDePosicion(j)).length;
    this.mensajePosicion = sinPortero
      ? 'La nueva formacion necesita un portero. El arco se dejo vacio para evitar colocar un jugador de campo.'
      : fueraPosicion
        ? `Formacion reorganizada: ${fueraPosicion} jugador(es) quedaron fuera de su posicion natural. Revisa las fichas amarillas.`
        : 'Formacion reorganizada respetando las posiciones naturales.';
  }

  // ─── Drag & drop ─────────────────────────────────────────
  onDragStartBanquillo(event: DragEvent, jugador: Jugador): void {
    this.cancelarSeleccionTactil(false);
    this.draggingFromBanquillo = jugador;
    this.draggingFromCancha = null;
    this.crearVistaArrastre(event, jugador);
  }

  onDragStartCancha(event: DragEvent, jec: JugadorEnCancha): void {
    this.cancelarSeleccionTactil(false);
    this.draggingFromCancha = jec;
    this.draggingFromBanquillo = null;
    this.crearVistaArrastre(event, jec.jugador, this.colorRol(jec.rol));
  }

  private crearVistaArrastre(event: DragEvent, jugador: Jugador, color = this.colorRol(jugador.posicion)): void {
    if (!event.dataTransfer) return;
    this.eliminarVistaArrastre();

    const preview = document.createElement('div');
    Object.assign(preview.style, {
      position: 'fixed', left: '-1000px', top: '-1000px', width: '190px', height: '58px',
      display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 12px',
      background: '#ffffff', border: `3px solid ${color}`, borderRadius: '14px',
      boxShadow: '0 10px 28px rgba(0,0,0,.35)', fontFamily: 'Arial, sans-serif',
      pointerEvents: 'none', zIndex: '99999'
    });

    const avatar = document.createElement('div');
    Object.assign(avatar.style, {
      width: '40px', height: '40px', borderRadius: '50%', flexShrink: '0', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center', background: color,
      color: '#fff', fontSize: '13px', fontWeight: '700'
    });
    if (jugador.foto) {
      const foto = document.createElement('img');
      foto.src = jugador.foto;
      foto.alt = '';
      Object.assign(foto.style, { width: '100%', height: '100%', objectFit: 'cover' });
      avatar.appendChild(foto);
    } else {
      avatar.textContent = this.iniciales(jugador);
    }

    const datos = document.createElement('div');
    Object.assign(datos.style, { minWidth: '0', flex: '1', lineHeight: '1.2' });
    const nombre = document.createElement('div');
    nombre.textContent = jugador.apellidos;
    Object.assign(nombre.style, { color: '#123d25', fontSize: '14px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
    const posicion = document.createElement('div');
    posicion.textContent = jugador.posicion;
    Object.assign(posicion.style, { color: '#6b7280', fontSize: '11px', marginTop: '3px' });
    datos.append(nombre, posicion);

    const dorsal = document.createElement('div');
    dorsal.textContent = `#${jugador.camiseta}`;
    Object.assign(dorsal.style, { color, fontSize: '17px', fontWeight: '800' });
    preview.append(avatar, datos, dorsal);
    document.body.appendChild(preview);
    this.dragPreview = preview;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(jugador.id || jugador.camiseta));
    event.dataTransfer.setDragImage(preview, 28, 29);
  }

  onDragEnd(): void {
    this.isDraggingOver = false;
    this.eliminarVistaArrastre();
  }

  private eliminarVistaArrastre(): void {
    this.dragPreview?.remove();
    this.dragPreview = null;
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
    this.asignarJugadorEnSlot(slotIdx);
  }

  seleccionarJugadorBanquillo(jugador: Jugador): void {
    this.jugadorTactilSeleccionado = jugador;
    this.jugadorCanchaTactilSeleccionado = null;
    this.draggingFromBanquillo = jugador;
    this.draggingFromCancha = null;
    this.mensajePosicion = `${jugador.nombres} ${jugador.apellidos} seleccionado. Ahora toca una posición compatible de la cancha.`;
  }

  seleccionarJugadorCancha(jec: JugadorEnCancha): void {
    this.jugadorCanchaTactilSeleccionado = jec;
    this.jugadorTactilSeleccionado = jec.jugador;
    this.draggingFromCancha = jec;
    this.draggingFromBanquillo = null;
    this.mensajePosicion = `${jec.jugador.nombres} ${jec.jugador.apellidos} seleccionado. Toca otra posición para moverlo.`;
  }

  colocarSeleccionadoEnSlot(slotIdx: number): void {
    if (!this.draggingFromBanquillo && !this.draggingFromCancha) return;
    this.asignarJugadorEnSlot(slotIdx);
  }

  cancelarSeleccionTactil(limpiarMensaje: boolean = true): void {
    this.jugadorTactilSeleccionado = null;
    this.jugadorCanchaTactilSeleccionado = null;
    this.draggingFromBanquillo = null;
    this.draggingFromCancha = null;
    if (limpiarMensaje) this.mensajePosicion = '';
  }

  private asignarJugadorEnSlot(slotIdx: number): void {
    const slot = this.posicionesPorFormacion[this.formacionSeleccionada][slotIdx];
    const yaOcupado = this.jugadorEnSlot(slotIdx);
    const jugadorMovido = this.draggingFromBanquillo ?? this.draggingFromCancha?.jugador ?? null;

    if (jugadorMovido && this.posicionBloqueada(jugadorMovido, slot.rol)) {
      this.mensajePosicion = `${jugadorMovido.nombres} ${jugadorMovido.apellidos} es ${jugadorMovido.posicion} y no puede ocupar la posicion de ${slot.rol}.`;
      this.draggingFromBanquillo = null;
      this.draggingFromCancha = null;
      this.jugadorTactilSeleccionado = null;
      this.jugadorCanchaTactilSeleccionado = null;
      return;
    }

    if (this.draggingFromBanquillo) {
      if (yaOcupado) {
        this.jugadoresEnCancha = this.jugadoresEnCancha.filter(j => j !== yaOcupado);
      }
      this.jugadoresEnCancha.push({
        jugador: this.draggingFromBanquillo,
        posicion: { x: slot.x, y: slot.y },
        rol: slot.rol,
        slotIndice: slotIdx,
      });
    } else if (this.draggingFromCancha) {
      if (yaOcupado && yaOcupado !== this.draggingFromCancha) {
        yaOcupado.posicion = { ...this.draggingFromCancha.posicion };
        yaOcupado.rol = this.draggingFromCancha.rol;
        yaOcupado.slotIndice = this.draggingFromCancha.slotIndice;
      }
      this.draggingFromCancha.posicion = { x: slot.x, y: slot.y };
      this.draggingFromCancha.rol = slot.rol;
      this.draggingFromCancha.slotIndice = slotIdx;
    }

    this.draggingFromBanquillo = null;
    this.draggingFromCancha = null;
    this.jugadorTactilSeleccionado = null;
    this.jugadorCanchaTactilSeleccionado = null;
    this.mensajePosicion = jugadorMovido && jugadorMovido.posicion !== slot.rol
      ? `Advertencia: ${jugadorMovido.apellidos} juega normalmente como ${jugadorMovido.posicion}, no como ${slot.rol}.`
      : '';
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
    this.cancelarSeleccionTactil();
  }

  limpiarCancha(): void {
    this.jugadoresEnCancha = [];
  }

  // ─── Guardar alineación ──────────────────────────────────
  guardarAlineacion(): void {
    if (this.slotsOcupados === 0) return;
    if (!this.partidoActual) {
      this.mensajePosicion = 'No se puede guardar: selecciona primero un partido programado.';
      return;
    }
    const invalido = this.jugadoresEnCancha.find(j => this.posicionBloqueada(j.jugador, j.rol));
    if (invalido) {
      this.mensajePosicion = `No se puede guardar: ${invalido.jugador.apellidos} no puede jugar como ${invalido.rol}.`;
      return;
    }

    const datos = {
      partido: this.partidoActual!,
      formacion: this.formacionSeleccionada,
      jugadoresEnCancha: [...this.jugadoresEnCancha],
      fechaCreacion: new Date().toLocaleDateString('es-EC'),
    };

    this.guardando = true;
    const alineacionDelPartido = this.alineaciones.find(a => a.partido?.id === this.partidoActual?.id);
    const idParaEditar = this.editandoId ?? alineacionDelPartido?.id ?? null;

    let peticion: Observable<unknown>;
    if (idParaEditar !== null) {
      const original = this.alineaciones.find(a => a.id === idParaEditar);
      peticion = this.alineacionesService.editar(idParaEditar, original?.version ?? 1, {
        ...datos, fechaCreacion: original?.fechaCreacion ?? datos.fechaCreacion,
      });
    } else {
      peticion = this.alineacionesService.agregar(datos);
    }

    peticion.pipe(finalize(() => {
      this.guardando = false;
      this.cdr.detectChanges();
    })).subscribe({ next: () => this.finalizarGuardado(), error: error => this.mostrarErrorGuardado(error) });
  }

  private finalizarGuardado(): void {
    this.vista = 'lista';
    this.editandoId = null;
    this.resetEditor();
    this.cargarAlineaciones();
    this.cdr.detectChanges();
  }

  private mostrarErrorGuardado(error: any): void {
    this.mensajePosicion = `No se pudo guardar la alineación: ${error?.error?.message || error?.error?.mensaje || error?.message || 'error inesperado'}`;
    this.cdr.detectChanges();
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
    this.editandoId = alineacion.id;
    const pIdx = this.partidosProgramados.findIndex(
      p => p.rival === alineacion.partido?.rival && p.fecha === alineacion.partido?.fecha
    );
    this.partidoSeleccionadoIdx = pIdx;
    this.vista = 'editor';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Eliminar alineación ──────────────────────────────────
  eliminarAlineacion(id: string): void {
    const alineacion = this.alineaciones.find(a => a.id === id);
    if (!alineacion) return;
    this.alineacionesService.eliminar(alineacion).subscribe(() => this.cargarAlineaciones());
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
    this.mensajePosicion = '';
  }

  private ordenarEnSlots(alineacion: Alineacion): Alineacion {
    const slots = this.posicionesPorFormacion[alineacion.formacion] || [];
    const usados = new Set<number>();
    const asignados = new Map<JugadorEnCancha, number>();
    for (const jec of alineacion.jugadoresEnCancha) {
      const idx = jec.slotIndice;
      if (Number.isInteger(idx) && idx! >= 0 && idx! < slots.length && !usados.has(idx!)) {
        usados.add(idx!); asignados.set(jec, idx!);
      }
    }
    for (const jec of alineacion.jugadoresEnCancha) {
      if (asignados.has(jec)) continue;
      const idx = slots.findIndex((slot, i) => !usados.has(i) && slot.rol === jec.rol);
      if (idx >= 0) { usados.add(idx); asignados.set(jec, idx); }
    }
    for (const jec of alineacion.jugadoresEnCancha) {
      if (asignados.has(jec)) continue;
      const idx = slots.findIndex((_, i) => !usados.has(i));
      if (idx >= 0) { usados.add(idx); asignados.set(jec, idx); }
    }
    const jugadoresEnCancha = alineacion.jugadoresEnCancha.map(jec => {
      const idx = asignados.get(jec);
      return idx === undefined ? jec : { ...jec, posicion: { x: slots[idx].x, y: slots[idx].y }, rol: slots[idx].rol, slotIndice: idx };
    });
    return { ...alineacion, jugadoresEnCancha };
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

  posicionBloqueada(jugador: Jugador, rolSlot: string): boolean {
    return (rolSlot === 'Portero' && jugador.posicion !== 'Portero') ||
      (jugador.posicion === 'Portero' && rolSlot !== 'Portero');
  }

  fueraDePosicion(jec: JugadorEnCancha): boolean {
    return jec.jugador.posicion !== jec.rol;
  }

  iniciales(jugador: Jugador): string {
    return (jugador.nombres[0] + jugador.apellidos[0]).toUpperCase();
  }
}
