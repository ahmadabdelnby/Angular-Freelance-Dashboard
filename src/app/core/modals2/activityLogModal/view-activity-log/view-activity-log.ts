import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-activity-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-activity-log.html',
  styleUrl: './view-activity-log.scss',
  encapsulation: ViewEncapsulation.None
})
export class ViewActivityLog {
  constructor(
    @Inject('data') public data: any,
    @Inject('onClose') private onClose: () => void
  ) {}

  close() {
    this.onClose();
  }

  getActionClass(): string {
    switch (this.data?.action) {
      case 'create':
        return 'badge bg-success';
      case 'update':
      case 'settings_change':
        return 'badge bg-primary';
      case 'delete':
        return 'badge bg-danger';
      case 'login':
        return 'badge bg-info';
      case 'logout':
        return 'badge bg-secondary';
      case 'approve':
        return 'badge bg-success';
      case 'reject':
      case 'suspend':
        return 'badge bg-warning text-dark';
      default:
        return 'badge bg-secondary';
    }
  }

  formatDate(date: string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  }

  formatDetails(): string {
    if (!this.data?.details) return 'No additional details';
    return JSON.stringify(this.data.details, null, 2);
  }
}
