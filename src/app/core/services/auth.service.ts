import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import type { User, UserRole } from '../models/user.model';

const USERS_KEY = 'users';
const SESSION_KEY = 'session_user';

const DEFAULT_USERS: User[] = [
  {
    id: crypto.randomUUID(),
    username: 'admin',
    password: 'admin123',
    role: 'secretario_tecnico',
    nombre: 'Administrador',
    activo: true,
  },
  {
    id: crypto.randomUUID(),
    username: 'presidente',
    password: 'pre123',
    role: 'presidente',
    nombre: 'Presidente',
    activo: true,
  },
  {
    id: crypto.randomUUID(),
    username: 'director',
    password: 'dir123',
    role: 'director_tecnico',
    nombre: 'Director Técnico',
    activo: true,
  },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    this.seedDefaultUsers();
    this.restoreSession();
  }

  private seedDefaultUsers(): void {
    if (!this.storage.get<User[]>(USERS_KEY)) {
      this.storage.set(USERS_KEY, DEFAULT_USERS);
    }
  }

  private restoreSession(): void {
    const user = this.storage.get<User>(SESSION_KEY);
    this.currentUser$.next(user);
  }

  login(username: string, password: string): boolean {
    const users = this.storage.get<User[]>(USERS_KEY) ?? [];
    const user = users.find(
      (u) => u.username === username && u.password === password && u.activo
    );
    if (user) {
      this.storage.set(SESSION_KEY, { ...user, password: '' });
      this.currentUser$.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this.storage.remove(SESSION_KEY);
    this.currentUser$.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser$.value;
  }

  getCurrentUser$(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  isLoggedIn(): boolean {
    return this.currentUser$.value !== null;
  }

  getUsers(): User[] {
    return this.storage.get<User[]>(USERS_KEY) ?? [];
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    this.storage.set(USERS_KEY, users);
  }

  deleteUser(id: string): void {
    const users = this.getUsers().filter((u) => u.id !== id);
    this.storage.set(USERS_KEY, users);
  }

  hasRole(roles: UserRole[]): boolean {
    const user = this.currentUser$.value;
    return user !== null && roles.includes(user.role);
  }

  getRoleLabel(role: UserRole): string {
    const labels: Record<UserRole, string> = {
      presidente: 'Presidente',
      director_tecnico: 'Director Técnico',
      secretario_tecnico: 'Secretario Técnico',
    };
    return labels[role];
  }
}
