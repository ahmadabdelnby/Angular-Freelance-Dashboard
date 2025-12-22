import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-proposal-card',
  imports: [CommonModule],
  templateUrl: './proposal-card.html',
  styleUrl: './proposal-card.scss',
})
export class ProposalCard {
  constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) { }

  // Called when the View button is clicked
  view() {
    this.onAction({ action: 'view', data: this.data });
  }


  // Called when the Delete button is clicked
  delete() {
    // Emit the delete action to parent
    this.onAction({ action: 'delete', data: this.data });
  }
}
