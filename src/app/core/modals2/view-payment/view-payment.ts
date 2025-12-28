import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-payment.html',
  styleUrl: './view-payment.scss',
  encapsulation: ViewEncapsulation.None
})
export class ViewPayment {
  constructor(
    @Inject('data') public data: any,
    @Inject('onClose') private onClose: () => void
  ) { }

  close() {
    this.onClose();
  }

  getStatusClass(): string {
    switch (this.data.status?.toLowerCase()) {
      case 'completed':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning text-dark';
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
    return new Date(date).toLocaleString();
  }
}
