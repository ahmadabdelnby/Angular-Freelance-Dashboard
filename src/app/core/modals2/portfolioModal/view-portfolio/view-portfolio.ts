import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-portfolio',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './view-portfolio.html',
  styleUrl: './view-portfolio.scss',
  encapsulation: ViewEncapsulation.None
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
