import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-view-portfolio',
  imports: [],
  templateUrl: './view-portfolio.html',
  styleUrl: './view-portfolio.scss',
})
export class ViewPortfolio {
    constructor(
    @Inject('data') public data: any,   // Injecting data passed from parent
    @Inject('onClose') private onClose: () => void  // Injecting close function
  ) { }

  // Close the modal
  close() {
    this.onClose();  // Trigger onClose function passed from the parent
  }
}
