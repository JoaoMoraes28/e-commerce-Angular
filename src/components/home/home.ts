import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
  @ViewChild('containerCarousel') public carousel!: ElementRef;
  @ViewChild('containerAnimation') public containerAnimation!: ElementRef;
  @ViewChild('card') public cardAd!: ElementRef;
  private resizeObserver!: ResizeObserver;
  private positionCard: number = 0;

  public listAd = [
    false,
    true,
    true,
    true,
    true,
    true,
  ];

  nextCard(direction: 'left' | 'right') {
    const container = this.containerAnimation.nativeElement;
    const card = this.cardAd.nativeElement;
    let cardWidth = card.offsetWidth


    if (direction === 'left' && this.positionCard > 0) {
      cardWidth = cardWidth * -1;

      this.positionCard--;
      this.listAd[this.positionCard + 1] = true;

    } else if (direction === 'right' && this.positionCard < 5) {

      this.positionCard++;
      this.listAd[this.positionCard - 1] = true;

    } else {
      return;

    };

    this.listAd[this.positionCard] = false;


    container.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });


  };

  onScroll() {
    const container = this.containerAnimation.nativeElement;
    let carouselPosition = container.scrollLeft;
    const card = this.cardAd.nativeElement;
    let widthCard = card.offsetWidth

    let indexCard = Math.round(carouselPosition / (widthCard + 20));

    if (indexCard < 1) {
      this.listAd[0] = false;
      this.positionCard = 0;

      this.resetListAd(0);

    } else if (indexCard >= 1 && indexCard < 2) {
      this.listAd[1] = false;
      this.positionCard = 1;

      this.resetListAd(1);

    } else if (indexCard >= 2 && indexCard < 3) {
      this.listAd[2] = false;
      this.positionCard = 2;

      this.resetListAd(2);

    } else if (indexCard >= 3 && indexCard < 4) {
      this.listAd[3] = false;
      this.positionCard = 3;

      this.resetListAd(3);

    } else if (indexCard >= 4 && indexCard < 5) {
      this.listAd[4] = false;
      this.positionCard = 4;

      this.resetListAd(4);

    } else if (indexCard >= 5 && indexCard < 6) {
      this.listAd[5] = false;
      this.positionCard = 5;

      this.resetListAd(5);

    };

  };

  resetListAd(number: number) {
    for (let i = 0; i < this.listAd.length; i++) {
      if (i != number) {
        this.listAd[i] = true;

      };

    };

  };

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  };

}

