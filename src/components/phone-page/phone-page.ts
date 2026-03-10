import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: '',
  standalone: true,
  templateUrl: './phone-page.html',
  styleUrl: './phone-page.css',
})
export class PhonePage {
  @ViewChild('carouselCard') carousel!: ElementRef;
  @ViewChild('cardPhone') card!: ElementRef;
  public validationPosition: String = "one";
  public carouselClicked: boolean = false;
  private animation: any;
  private indexAutoCarousel = 0;

  changeCard(element: HTMLElement | string) {
    const container = this.carousel.nativeElement;
    const widthCard = this.card.nativeElement.offsetWidth;
    let widthScroll!: number;

    if (typeof element !== 'string') {
      if (element.id == 'one') {
        widthScroll = widthCard
        this.validationPosition = "one"
        this.indexAutoCarousel = 1;

      } else if (element.id == 'two') {
        widthScroll = widthCard * 2
        this.validationPosition = "two"
        this.indexAutoCarousel = 2;

      } else if (element.id == 'three') {
        widthScroll = widthCard * 3
        this.validationPosition = "three"
        this.indexAutoCarousel = 3;

      } else if (element.id == 'four') {
        widthScroll = widthCard * 4
        this.validationPosition = "four"
        this.indexAutoCarousel = 4;

      } else if (element.id == 'five') {
        widthScroll = widthCard * 5
        this.validationPosition = "five"
        this.indexAutoCarousel = 5;

      }

    } else {
      if (element == 'one') {
        widthScroll = widthCard;
        this.validationPosition = "one";
        this.indexAutoCarousel = 1;

      } else if (element == 'two') {
        widthScroll = widthCard * 2;
        this.validationPosition = "two";
        this.indexAutoCarousel = 2;

      } else if (element == 'three') {
        widthScroll = widthCard * 3;
        this.validationPosition = "three";
        this.indexAutoCarousel = 3;

      } else if (element == 'four') {
        widthScroll = widthCard * 4;
        this.validationPosition = "four";
        this.indexAutoCarousel = 4;

      } else if (element == 'five') {
        widthScroll = widthCard * 5;
        this.validationPosition = "five";
        this.indexAutoCarousel = 5;

      }

    }

    container.scrollTo({
      left: widthScroll,
      behavior: 'smooth'
    })

  }

  onScrollCarousel() {
    const container = this.carousel.nativeElement;
    let containerPosition = container.scrollLeft
    const widthCard = this.card.nativeElement.offsetWidth;

    let indexCard = Math.round(containerPosition / (widthCard + 20))

    if (indexCard < 1) {
      this.validationPosition = "one"
      this.indexAutoCarousel = 1;

    } else if (indexCard >= 1 && indexCard < 2) {
      this.validationPosition = "two"
      this.indexAutoCarousel = 2;

    } else if (indexCard >= 2 && indexCard < 3) {
      this.validationPosition = "three"
      this.indexAutoCarousel = 3;

    } else if (indexCard >= 3 && indexCard < 4) {
      this.validationPosition = "four"
      this.indexAutoCarousel = 4;

    } else if (indexCard >= 4 && indexCard < 5) {
      this.validationPosition = "five"
      this.indexAutoCarousel = 5;

    }

  }

  autoCarousel() {
    if (this.carouselClicked) {
      this.carouselClicked = false;

      clearInterval(this.animation);

    } else {
      this.carouselClicked = true;

      this.animation = setInterval(() => {
        let listOrder = [
          "one",
          "two",
          "three",
          "four",
          "five",
        ];

        if (this.indexAutoCarousel != 5) {
          this.changeCard(listOrder[this.indexAutoCarousel]);

          this.indexAutoCarousel++;

        } else {
          this.indexAutoCarousel = 0;

        };



      }, 5000);

    };

  };

}
