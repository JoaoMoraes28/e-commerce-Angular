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
  private resizeObserver!: ResizeObserver;
  private widthScreen!: number;
  private countAnimation: number = 0;
  private numberAnimationFixed: number = 1550
  private numberAnimation!: number;
  public animation: string = `translateX(1550px)`;
  public modalClose = {
    closeOne: false,
    closeTwo: false,
    shoList: false
  }
  public listAd = [
    false,
    true,
    true,
    true,
    true,
    true,
  ]

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.widthScreen = entry.contentRect.width;
      }

      if (this.widthScreen < 768) {
        console.log('Mobile')
        this.animation = 'translateX(800px)'

      } else if (this.widthScreen >= 768 && this.widthScreen < 1280) {
        console.log('Tablet')
        this.animation = 'translate(1550px)'

      } else {
        alert('é Desktop Animal!!')

      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.carousel.nativeElement)
  }

  changeListNav() {
    if (this.modalClose.closeOne == false) {
      this.modalClose = { closeOne: true, closeTwo: true, shoList: true }
      this.renderer.addClass(this.document.body, 'remove-scrool')

    } else {
      this.modalClose = { closeOne: false, closeTwo: false, shoList: false }
      this.renderer.removeClass(this.document.body, 'remove-scrool')

    }

  }

  changeCarouselRight() {
    // if (this.countAnimation < 5) {
    //   this.calculateTranlateCarousel()
    //   this.numberAnimationFixed -= this.numberAnimation;
    //   this.animation = `translateX(${this.numberAnimationFixed}px)`;
    //   this.countAnimation++

    //   this.listAd[this.countAnimation - 1] = true;
    //   this.listAd[this.countAnimation] = false;
    // }
  }

  changeCarouselLeft() {
    // if (this.countAnimation != 0) {
    //   this.calculateTranlateCarousel()
    //   this.numberAnimationFixed += this.numberAnimation

    //   this.animation = `translateX(${this.numberAnimationFixed}px)`;
    //   this.countAnimation--

    //   this.listAd[this.countAnimation + 1] = true;
    //   this.listAd[this.countAnimation] = false;

    // }

  }

  calculateTranlateCarousel() {
    if (this.widthScreen < 768) {
      console.log('Mobile')
      this.numberAnimation = 320

    } else if (this.widthScreen >= 768 && this.widthScreen < 1280) {
      console.log('Tablet')
      this.numberAnimation = 620

    } else {
      alert('é Desktop Animal!!')

    }
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

}
