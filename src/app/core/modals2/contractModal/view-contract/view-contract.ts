import { CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-view-contract',
  imports: [CurrencyPipe],
  templateUrl: './view-contract.html',
  styleUrl: './view-contract.scss',
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
