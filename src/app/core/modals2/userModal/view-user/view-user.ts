import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-user',
  imports: [CommonModule],
  templateUrl: './view-user.html',
  styleUrl: './view-user.scss',
  encapsulation: ViewEncapsulation.None
})
export class ViewUser {
  constructor(
    @Inject('data') public data: any,   // Injecting data passed from parent
    @Inject('onClose') private onClose: () => void  // Injecting close function
  ) { }

  // Close the modal
  close() {
    this.onClose();  // Trigger onClose function passed from the parent
  }
}
