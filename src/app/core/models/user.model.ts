export type UserRole = 'presidente' | 'director_tecnico' | 'secretario_tecnico';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  nombre: string;
  activo: boolean;
}
