import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-contract',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './view-contract.html',
  styleUrl: './view-contract.scss',
  encapsulation: ViewEncapsulation.None
})
export class ViewContract {
  constructor(
    @Inject('data') public data: any,   // Injecting data passed from parent
    @Inject('onClose') private onClose: () => void  // Injecting close function
  ) { }

  // Close the modal
  close() {
    this.onClose();  // Trigger onClose function passed from the parent
  }
}
