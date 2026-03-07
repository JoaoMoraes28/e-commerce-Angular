import { Component, DOCUMENT, ElementRef, Inject, Renderer2, signal, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('first-angular-project');

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document

  ) { }

  @ViewChild('containerCarousel') public carousel!: ElementRef;
  @ViewChild('containerAnimation') public containerAnimation!: ElementRef;
  @ViewChild('card') public cardAd!: ElementRef;
  private resizeObserver!: ResizeObserver;
  private widthScreen!: number;
  private positionCard: number = 0;
  public modalClose = {
    closeOne: false,
    closeTwo: false,
    showList: false
  };
  public listAd = [
    false,
    true,
    true,
    true,
    true,
    true,
  ];

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.widthScreen = entry.contentRect.width;
      }
    });
  };

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.carousel.nativeElement);
  };

  changeListNav() {
    if (this.modalClose.closeOne == false) {
      this.modalClose = { closeOne: true, closeTwo: true, showList: true };
      this.renderer.addClass(this.document.body, 'remove-scrool');

    } else {
      this.modalClose = { closeOne: false, closeTwo: false, showList: false };
      this.renderer.removeClass(this.document.body, 'remove-scrool');

    };

  };

  nextCard(direction: 'left' | 'right') {
    const container = this.containerAnimation.nativeElement;
    let cardWidth = this.cardAd.nativeElement.offsetWidth;


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
    const widthCard = this.cardAd.nativeElement.offsetWidth;

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
