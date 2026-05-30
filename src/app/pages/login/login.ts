import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = '';
  loading = false;
  showPassword = false;

  constructor() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    this.error = '';
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Ingrese usuario y contraseña';
      return;
    }

    this.loading = true;
    const success = this.auth.login(this.username.trim(), this.password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales incorrectas. Intente nuevamente.';
      this.loading = false;
    }
  }
}
