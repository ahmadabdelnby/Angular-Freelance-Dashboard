import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-card',
  imports: [CommonModule],
  templateUrl: './country-card.html',
  styleUrl: './country-card.scss',
})
export class CountryCard {
  constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) { 

  }

  update() {
    this.onAction({ action: 'update', data: this.data });
  }


  delete() {
    // Emit the delete action to parent
    this.onAction({ action: 'delete', data: this.data });
  }
}
