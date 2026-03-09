import { Component, DOCUMENT, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class Header {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,

  ) { }

  public modalClose = {
    closeOne: false,
    closeTwo: false,
    showList: false
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
}
