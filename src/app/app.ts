import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { Nadvar } from './components/nadvar/nadvar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Nadvar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private auth = inject(AuthService);
  private router = inject(Router);

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  constructor() {
    this.auth.getCurrentUser$().subscribe((user) => {
      if (!user) {
        this.router.navigate(['/']);
      }
    });
  }
}
