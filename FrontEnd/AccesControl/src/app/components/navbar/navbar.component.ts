import { CommonModule } from '@angular/common';
import { Component, HostListener, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
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
      this.showProductMenu = false;
      this.isSubmenuVisible = false;
    }
  }

  toggleProductMenu() {
    this.showProductMenu = !this.showProductMenu;
  }

  // Cierra los menús al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Cerrar menú móvil si se hace clic fuera
    if (!target.closest('.mobile-menu-container') && 
        !target.closest('button[aria-label="Open main menu"]') &&
        this.showMobileMenu) {
      this.toggleMobileMenu();
    }
    
    // Cerrar submenú de producto si se hace clic fuera
    if (!target.closest('.sub') && this.isSubmenuVisible) {
      this.isSubmenuVisible = false;
    }
  }

  onLogout() {
    this.logout.emit();
  }
}