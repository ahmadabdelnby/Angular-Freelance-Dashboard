import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-job',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './view-job.html',
  styleUrls: ['./view-job.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewJob {
  constructor(
    @Inject('data') public data: any,   // Injecting data passed from parent
    @Inject('onClose') private onClose: () => void  // Injecting close function
  ) { }

  // Close the modal
  close() {
    this.onClose();  // Trigger onClose function passed from the parent
  }
}
