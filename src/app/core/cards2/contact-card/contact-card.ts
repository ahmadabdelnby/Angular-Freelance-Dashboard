import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss',
})
export class ContactCard {
  constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) {}

  // Called when the View button is clicked
  view() {
    this.onAction({ action: 'view', data: this.data });
  }

  // Called when the Delete button is clicked
  delete() {
    this.onAction({ action: 'delete', data: this.data });
  }

  getStatusClass(): string {
    switch (this.data?.status) {
      case 'new':
        return 'bg-primary';
      case 'in_progress':
        return 'bg-warning text-dark';
      case 'resolved':
        return 'bg-success';
      case 'archived':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }

  getStatusLabel(): string {
    switch (this.data?.status) {
      case 'new':
        return 'New';
      case 'in_progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'archived':
        return 'Archived';
      default:
        return 'Unknown';
    }
  }
}
