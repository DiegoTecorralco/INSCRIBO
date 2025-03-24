import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel-market',
  standalone: true,
  templateUrl: './carousel-market.component.html',
  styleUrls: ['./carousel-market.component.css']
})
export class CarouselMarketComponent implements AfterViewInit {
  @ViewChild('carouselBody') carouselBody!: ElementRef<HTMLDivElement>;
  currentIndex = 0;
  slides = [
    { image: '/Assets/logoCompany.png', alt: 'Logo company', bgClass: 'bg-gray-100' },
    { image: '/Assets/garritaUTXJ.png', alt: 'Garrita', bgClass: 'bg-gray-200' },
    { image: '/Assets/tigrilloUTXJ.png', alt: 'Tigre', bgClass: 'bg-gray-300' }
  ];

  ngAfterViewInit() {
    this.updateCarouselPosition();
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
    const translateX = -this.currentIndex * 100;
    this.carouselBody.nativeElement.style.transform = `translateX(${translateX}%)`;
  }
}