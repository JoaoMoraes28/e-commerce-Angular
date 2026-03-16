import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: '',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './phone-page.html',
  styleUrl: './phone-page.css',
})
export class PhonePage {
  @ViewChild('carouselCard') carousel!: ElementRef;
  @ViewChild('cardPhone') card!: ElementRef;
  @ViewChild('carouselAttribute') carouselAtribute!: ElementRef;
  @ViewChild('cardAttribute') cardAtribute!: ElementRef;
  public validationPosition: String = "one";
  public carouselClicked: boolean = false;
  private animation: any;
  private indexAutoCarousel = 0;
  private indexCarouselAtribute = 0;
  public carouselDisableLeft = true;
  public carouselDisableRight = false;


  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Methal Shield', 'Bateria', 'Câmera', 'Processamento',],
    datasets: [
      {
        data: [84, 130, 107, 203],
        label: 'Phone20',
        backgroundColor: '#6c83f5'
      },
      {
        data: [194, 239, 156, 279],
        label: 'Phone21',
        backgroundColor: '#57C785'
      }
    ]
  };

  public barCharOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Compare o Phone21 com se Antecessor',
        color: '#333',
        font: {
          size: 14,
          weight: 'bolder',
          family: 'Arial'
        },
        padding: {
          top: 15,
          bottom: 15
        }
      }
    },
    indexAxis: 'y',
    scales: {
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  public barChartType: ChartConfiguration<'bar'>['type'] = 'bar';

  changeCard(element: HTMLElement | string) {
    const container = this.carousel.nativeElement;
    const card = this.card.nativeElement;
    let widthCard = card.offsetWidth
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
    const card = this.card.nativeElement;
    let widthCard = card.offsetWidth

    let indexCard = Math.round(containerPosition / (widthCard + 20))

    if (indexCard == 0) {
      this.validationPosition = "one"
      this.indexAutoCarousel = 1;

    } else if (indexCard == 1) {
      this.validationPosition = "two"
      this.indexAutoCarousel = 2;

    } else if (indexCard == 2) {
      this.validationPosition = "three"
      this.indexAutoCarousel = 3;

    } else if (indexCard == 3) {
      this.validationPosition = "four"
      this.indexAutoCarousel = 4;

    } else if (indexCard == 4) {
      this.validationPosition = "five"
      this.indexAutoCarousel = 5;

    }

  }

  changeCardAttribute(direction: 'left' | 'right') {
    const carousel = this.carouselAtribute.nativeElement;
    const card = this.cardAtribute.nativeElement;
    let cardWidth = card.offsetWidth

    if (direction == 'left' && this.indexCarouselAtribute > 0) {
      cardWidth = cardWidth * -1
      this.indexCarouselAtribute--
      this.valideButtonCarousel()

    } else if (direction == 'right' && this.indexCarouselAtribute < 3) {
      this.indexCarouselAtribute++
      this.valideButtonCarousel()

    } else {
      this.valideButtonCarousel()
      return

    }


    carousel.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    })

  }

  valideButtonCarousel() {
    this.carouselDisableLeft = false;
    this.carouselDisableRight = false;

    if (this.indexCarouselAtribute == 0) {
      this.carouselDisableLeft = true;

    } else if (this.indexCarouselAtribute == 3) {
      this.carouselDisableRight = true;

    }
  }

  onScrollCarouselAtribute() {
    const carouselPosition = this.carouselAtribute.nativeElement.scrollLeft
    const cardWidth = this.cardAtribute.nativeElement.offsetWidth

    let indexCarousel = Math.round(carouselPosition / (cardWidth + 20))

    if (indexCarousel == 0) {
      this.indexCarouselAtribute = 0;

    } else if (indexCarousel == 1) {
      this.indexCarouselAtribute = 1;

    } else if (indexCarousel == 2) {
      this.indexCarouselAtribute = 2;

    } else if (indexCarousel == 3) {
      this.indexCarouselAtribute = 3;

    }

    this.valideButtonCarousel()

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
