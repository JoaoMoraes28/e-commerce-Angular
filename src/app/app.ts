import { Component, DOCUMENT, ElementRef, Inject, QueryList, Renderer2, signal, ViewChild, ViewChildren } from '@angular/core';
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

  private countAnimation: number = 0;
  private numberAnimation: number = 0;
  public animation: string = `translateX(0px)`;

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
    if (this.countAnimation < 5) {
      this.numberAnimation -= 320;
      this.animation = `translateX(${this.numberAnimation}px)`;
      this.countAnimation++

      this.listAd[this.countAnimation - 1] = true;
      this.listAd[this.countAnimation] = false;  
      
    }
  }

  changeCarouselLeft() {
    if (this.countAnimation != 0) {
      this.numberAnimation += 320
      this.animation = `translateX(${this.numberAnimation}px)`;
      this.countAnimation--

      this.listAd[this.countAnimation + 1] = true;
      this.listAd[this.countAnimation] = false;  

    }

  }

}
