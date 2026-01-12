import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) { }

  // Called when the View button is clicked
  view() {
    this.onAction({ action: 'view', data: this.data });
  }

  // Called when the Cancel button is clicked
  cancel() {
    // Emit the cancel action to parent
    this.onAction({ action: 'cancel', data: this.data });
  }
}




