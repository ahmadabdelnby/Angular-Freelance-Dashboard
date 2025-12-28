import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-contract-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-card.html',
  styleUrl: './contract-card.scss',
})
export class ContractCard {
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
