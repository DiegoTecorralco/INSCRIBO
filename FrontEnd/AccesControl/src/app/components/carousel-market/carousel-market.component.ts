import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, NgZone } from '@angular/core';

@Component({
  selector: 'app-carousel-market',
  standalone: true,
  templateUrl: './carousel-market.component.html',
  styleUrls: ['./carousel-market.component.css']
})
export class CarouselMarketComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carouselBody', { static: false }) carouselBody!: ElementRef<HTMLDivElement>;
  currentIndex = 0;
  intervalId: any;

  slides = [
    { image: 'assets/logoCompany.png', alt: 'Logo company', bgClass: 'bg-gray-100' },
    { image: 'assets/garritaUTXJ.png', alt: 'Garrita', bgClass: 'bg-gray-100' },
    { image: 'assets/tigrilloUTXJ.png', alt: 'Tigre', bgClass: 'bg-gray-100' }
  ];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    if (this.carouselBody) {
      this.updateCarouselPosition();
      this.startAutoSlide(); // Iniciar el cambio automático
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateCarouselPosition();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateCarouselPosition();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarouselPosition();
  }

  private updateCarouselPosition() {
    if (this.carouselBody?.nativeElement) {
      const translateX = -this.currentIndex * 100;
      this.carouselBody.nativeElement.style.transform = `translateX(${translateX}%)`;
    }
  }

  private startAutoSlide() {
    // Corre el intervalo fuera de Angular para no disparar cambios de detección constantemente
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => this.nextSlide()); // Vuelve a zona Angular solo cuando sea necesario
      }, 5000);
    });
  }
}
