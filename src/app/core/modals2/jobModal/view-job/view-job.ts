import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-view-job',
  imports: [CommonModule],
  templateUrl: './view-job.html',
  styleUrls: ['./view-job.scss'],
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
