import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);

  username = '';
  password = '';
  error = '';
  loading = false;
  showPassword = false;

  onSubmit(): void {
    this.error = '';
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Ingrese usuario y contraseña';
      return;
    }

    this.loading = true;
    this.router.navigate(['/dashboard']);
  }
}
