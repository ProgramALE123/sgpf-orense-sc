import { Component, AfterViewInit, OnDestroy, inject, viewChild, ElementRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Offcanvas } from 'bootstrap';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-nadvar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nadvar.html',
  styleUrl: './nadvar.css',
})
export class Nadvar implements AfterViewInit, OnDestroy {
  private router = inject(Router);

  readonly offcanvasEl = viewChild<ElementRef<HTMLDivElement>>('offcanvasSidebar');
  private offcanvas: Offcanvas | null = null;

  navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/usuarios', label: 'Usuarios', icon: 'bi-people-fill' },
    { path: '/jugadores', label: 'Jugadores', icon: 'bi-person-badge-fill' },
    { path: '/entrenadores', label: 'Entrenadores', icon: 'bi-person-workspace' },
    { path: '/partidos', label: 'Partidos', icon: 'bi-calendar-event-fill' },
    { path: '/alineaciones', label: 'Alineaciones', icon: 'bi-diagram-3-fill' },
  ];

  ngAfterViewInit(): void {
    const el = this.offcanvasEl()?.nativeElement;
    if (el) {
      this.offcanvas = Offcanvas.getOrCreateInstance(el, { backdrop: true });
    }
  }

  ngOnDestroy(): void {
    this.offcanvas?.dispose();
  }

  openMobile(): void {
    this.offcanvas?.show();
  }

  closeMobile(): void {
    this.offcanvas?.hide();
  }

  logout(): void {
    this.offcanvas?.hide();
    this.router.navigate(['/']);
  }
}
