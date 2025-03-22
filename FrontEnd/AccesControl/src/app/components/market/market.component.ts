import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef; // Referencia al contenedor del carrusel
  currentSlide = 0; // Índice de la diapositiva actual
  totalSlides = 3; // Número total de diapositivas

  ngAfterViewInit(): void {
    // Inicia la rotación automática del carrusel
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  // Muestra una diapositiva específica
  showSlide(index: number): void {
    this.currentSlide = index;
    this.updateCarousel();
  }

  // Avanza a la siguiente diapositiva
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }

  // Actualiza la posición del carrusel 
  updateCarousel(): void {
    const offset = -this.currentSlide * 100;
    this.carousel.nativeElement.style.transform = `translateX(${offset}%)`;
  }
}