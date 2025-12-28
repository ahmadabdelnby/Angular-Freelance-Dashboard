import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.scss',
})
export class PaymentCard {
  constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) { }

  view() {
    this.onAction({ action: 'view', data: this.data });
  }

  delete() {
    this.onAction({ action: 'delete', data: this.data });
  }

  getStatusClass(): string {
    switch (this.data.status?.toLowerCase()) {
      case 'completed':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'failed':
        return 'badge bg-danger';
      case 'refunded':
        return 'badge bg-info';
      case 'held':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  }

  formatCurrency(amount: number): string {
    return amount ? `$${amount.toFixed(2)}` : '$0.00';
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }
}
