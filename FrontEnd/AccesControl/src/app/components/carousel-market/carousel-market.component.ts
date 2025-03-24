import { Component, AfterViewInit } from '@angular/core';

declare const HSStaticMethods: {
  autoInit(): void;
};

@Component({
  selector: 'app-carousel-market',
  standalone: true,
  templateUrl: './carousel-market.component.html',
  styleUrls: ['./carousel-market.component.css']
})
export class CarouselMarketComponent implements AfterViewInit {
  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof HSStaticMethods !== 'undefined') {
        HSStaticMethods.autoInit();
      }
    }, 0);
  }
}