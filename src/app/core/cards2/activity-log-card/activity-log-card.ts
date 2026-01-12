import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-log-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-log-card.html',
  styleUrl: './activity-log-card.scss',
})
export class ActivityLogCard {
  constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) {}

  view() {
    this.onAction({ action: 'view', data: this.data });
  }

  getActionClass(): string {
    switch (this.data?.action) {
      case 'create':
        return 'bg-success';
      case 'update':
      case 'settings_change':
        return 'bg-primary';
      case 'delete':
        return 'bg-danger';
      case 'login':
        return 'bg-info';
      case 'logout':
        return 'bg-secondary';
      case 'approve':
        return 'bg-success';
      case 'reject':
      case 'suspend':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  }

  getActionIcon(): string {
    switch (this.data?.action) {
      case 'create':
        return 'bi-plus-circle';
      case 'update':
      case 'settings_change':
        return 'bi-pencil';
      case 'delete':
        return 'bi-trash';
      case 'login':
        return 'bi-box-arrow-in-right';
      case 'logout':
        return 'bi-box-arrow-right';
      case 'approve':
        return 'bi-check-circle';
      case 'reject':
        return 'bi-x-circle';
      case 'suspend':
        return 'bi-pause-circle';
      case 'view':
        return 'bi-eye';
      default:
        return 'bi-activity';
    }
  }

  formatDate(date: string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  }
}
