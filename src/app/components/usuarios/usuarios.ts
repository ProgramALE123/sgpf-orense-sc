import { Component, OnInit, AfterViewInit, OnDestroy, inject, signal, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

export type UserRole = 'presidente' | 'director_tecnico' | 'secretario_tecnico';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  nombre: string;
  activo: boolean;
}

const USERS_KEY = 'sgpf_users';

function getUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit, AfterViewInit, OnDestroy {
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
    this.users.set(getUsers());
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

    const user: User = {
      id: this.editingUser()?.id ?? crypto.randomUUID(),
      username: this.form.username.trim(),
      password: this.form.password.trim() || this.editingUser()!.password,
      role: this.form.role,
      nombre: this.form.nombre.trim(),
      activo: this.form.activo,
    };

    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    saveUsers(users);

    this.loadUsers();
    this.editModal?.hide();
    this.showToast(this.editingUser() ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
  }

  confirmDelete(user: User): void {
    this.deletingUser.set(user);
    this.deleteModal?.show();
  }

  deleteUser(): void {
    const user = this.deletingUser();
    if (!user) return;
    const users = getUsers().filter((u) => u.id !== user.id);
    saveUsers(users);
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
    const labels: Record<UserRole, string> = {
      presidente: 'Presidente',
      director_tecnico: 'Director Técnico',
      secretario_tecnico: 'Secretario Técnico',
    };
    return labels[role];
  }

  getRoleBadgeClass(role: UserRole): string {
    const classes: Record<UserRole, string> = {
      presidente: 'bg-warning text-dark',
      director_tecnico: 'bg-primary',
      secretario_tecnico: 'bg-secondary',
    };
    return classes[role];
  }
}
