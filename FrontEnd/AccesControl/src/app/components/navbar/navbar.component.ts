import { CommonModule } from '@angular/common';
import { Component, HostListener, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports:[CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() logout = new EventEmitter<void>()
  showMobileMenu = false;
  showProductMenu = false;
  isSubmenuVisible = false;

  toggleSubmenu(event: Event) {
    event.stopPropagation();
    this.isSubmenuVisible = !this.isSubmenuVisible;
  }
  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    if (!this.showMobileMenu) {
      this.showProductMenu = false; // Cierra el submenú al cerrar el menú principal
    }
  }

  toggleProductMenu() {
    this.showProductMenu = !this.showProductMenu;
  }

  // Cierra el menú al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-menu-container') && 
        !target.closest('button[aria-label="Open main menu"]') &&
        this.showMobileMenu) {
      this.toggleMobileMenu();
    }
  }
  onLogout() {
    this.logout.emit(); // Emitir el evento para que el AppComponent lo capture
  }
}