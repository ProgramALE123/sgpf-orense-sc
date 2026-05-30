import { Component, OnInit, AfterViewInit, OnDestroy, inject, signal, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Modal } from 'bootstrap';
import type { User, UserRole } from '../../core/models/user.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit, AfterViewInit, OnDestroy {
  private auth = inject(AuthService);

  readonly editModalEl = viewChild<ElementRef<HTMLDivElement>>('editModal');
  readonly deleteModalEl = viewChild<ElementRef<HTMLDivElement>>('deleteModal');
  readonly nameInputEl = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  private editModal: Modal | null = null;
  private deleteModal: Modal | null = null;

  users = signal<User[]>([]);
  searchTerm = signal('');
  editingUser = signal<User | null>(null);
  deletingUser = signal<User | null>(null);
  successMsg = signal('');
  errorMsg = signal('');

  form = {
    username: '',
    password: '',
    role: 'secretario_tecnico' as UserRole,
    nombre: '',
    activo: true,
  };

  roles: { value: UserRole; label: string }[] = [
    { value: 'presidente', label: 'Presidente' },
    { value: 'director_tecnico', label: 'Director Técnico' },
    { value: 'secretario_tecnico', label: 'Secretario Técnico' },
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    const editEl = this.editModalEl()?.nativeElement;
    const deleteEl = this.deleteModalEl()?.nativeElement;

    if (editEl) {
      this.editModal = Modal.getOrCreateInstance(editEl, { keyboard: true });
    }
    if (deleteEl) {
      this.deleteModal = Modal.getOrCreateInstance(deleteEl, { backdrop: 'static', keyboard: false });
    }
  }

  ngOnDestroy(): void {
    this.editModal?.dispose();
    this.deleteModal?.dispose();
  }

  loadUsers(): void {
    this.users.set(this.auth.getUsers());
  }

  get filteredUsers(): User[] {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.users();
    return this.users().filter(
      (u) =>
        u.username.toLowerCase().includes(term) ||
        u.nombre.toLowerCase().includes(term)
    );
  }

  openCreate(): void {
    this.editingUser.set(null);
    this.errorMsg.set('');
    this.form = {
      username: '',
      password: '',
      role: 'secretario_tecnico',
      nombre: '',
      activo: true,
    };
    this.editModal?.show();
    setTimeout(() => this.nameInputEl()?.nativeElement?.focus(), 150);
  }

  openEdit(user: User): void {
    this.errorMsg.set('');
    this.editingUser.set(user);
    this.form = {
      username: user.username,
      password: user.password,
      role: user.role,
      nombre: user.nombre,
      activo: user.activo,
    };
    this.editModal?.show();
    setTimeout(() => this.nameInputEl()?.nativeElement?.focus(), 150);
  }

  save(): void {
    this.errorMsg.set('');

    if (!this.form.username.trim() || !this.form.nombre.trim()) {
      this.errorMsg.set('Usuario y nombre son obligatorios');
      return;
    }

    if (!this.editingUser() && !this.form.password.trim()) {
      this.errorMsg.set('La contraseña es obligatoria');
      return;
    }

    const currentUser = this.auth.getCurrentUser();
    const user: User = {
      id: this.editingUser()?.id ?? crypto.randomUUID(),
      username: this.form.username.trim(),
      password: this.form.password.trim() || this.editingUser()!.password,
      role: this.form.role,
      nombre: this.form.nombre.trim(),
      activo: this.form.activo,
    };

    this.auth.saveUser(user);
    this.loadUsers();
    this.editModal?.hide();

    this.showToast(this.editingUser() ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');

    if (currentUser && currentUser.id === user.id) {
      this.auth.logout();
    }
  }

  confirmDelete(user: User): void {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser && currentUser.id === user.id) {
      this.errorMsg.set('No puede eliminar su propio usuario');
      return;
    }
    this.deletingUser.set(user);
    this.deleteModal?.show();
  }

  deleteUser(): void {
    const user = this.deletingUser();
    if (!user) return;
    this.auth.deleteUser(user.id);
    this.loadUsers();
    this.deleteModal?.hide();
    this.deletingUser.set(null);
    this.showToast('Usuario eliminado correctamente');
  }

  showToast(message: string): void {
    this.successMsg.set(message);
    setTimeout(() => this.successMsg.set(''), 3000);
  }

  getRoleLabel(role: UserRole): string {
    return this.auth.getRoleLabel(role);
  }

  getRoleBadgeClass(role: UserRole): string {
    const classes: Record<UserRole, string> = {
      presidente: 'bg-gold',
      director_tecnico: 'bg-info',
      secretario_tecnico: 'bg-secondary',
    };
    return classes[role];
  }
}
