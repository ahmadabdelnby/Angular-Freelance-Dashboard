import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, ViewEncapsulation, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContractService } from '../../../../services2/contractService/contract.service';

@Component({
  selector: 'app-view-contract',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './view-contract.html',
  styleUrl: './view-contract.scss',
  encapsulation: ViewEncapsulation.None
})
export class ViewContract {
  // Admin action states
  showEditAmount = false;
  newAmount: number = 0;
  actionReason: string = '';
  isLoading = false;
  actionSuccess = false;
  actionError = '';

  constructor(
    @Inject('data') public data: any,
    @Inject('onClose') private onClose: () => void,
    @Optional() @Inject('onRefresh') private onRefresh: (() => void) | null,
    private contractService: ContractService
  ) {
    this.newAmount = this.data?.agreedAmount || 0;
  }

  // Close the modal
  close() {
    this.onClose();
  }

  // Admin: Complete contract and release payment
  adminComplete() {
    if (!confirm('Are you sure you want to complete this contract and release payment to the freelancer?')) {
      return;
    }

    this.isLoading = true;
    this.actionError = '';

    this.contractService.adminCompleteContract(this.data._id, this.actionReason).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.actionSuccess = true;
        this.data.status = 'completed';
        alert(`✅ Contract completed! $${res.releasedAmount || 0} released to freelancer.`);
        if (this.onRefresh) this.onRefresh();
      },
      error: (err) => {
        this.isLoading = false;
        this.actionError = err.error?.message || 'Failed to complete contract';
        alert('❌ ' + this.actionError);
      }
    });
  }

  // Admin: Cancel contract and refund client
  adminCancel() {
    if (!confirm('Are you sure you want to cancel this contract and refund the client?')) {
      return;
    }

    this.isLoading = true;
    this.actionError = '';

    this.contractService.adminCancelContract(this.data._id, this.actionReason).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.actionSuccess = true;
        this.data.status = 'terminated';
        alert(`✅ Contract cancelled! $${res.refundAmount || 0} refunded to client.`);
        if (this.onRefresh) this.onRefresh();
      },
      error: (err) => {
        this.isLoading = false;
        this.actionError = err.error?.message || 'Failed to cancel contract';
        alert('❌ ' + this.actionError);
      }
    });
  }

  // Admin: Update contract amount
  adminUpdateAmount() {
    if (this.newAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!confirm(`Are you sure you want to update the amount to $${this.newAmount}?`)) {
      return;
    }

    this.isLoading = true;
    this.actionError = '';

    this.contractService.adminUpdateContractAmount(this.data._id, this.newAmount, this.actionReason).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.showEditAmount = false;
        this.data.agreedAmount = this.newAmount;
        alert(`✅ Amount updated! Old: $${res.oldAmount}, New: $${res.newAmount}`);
        if (this.onRefresh) this.onRefresh();
      },
      error: (err) => {
        this.isLoading = false;
        this.actionError = err.error?.message || 'Failed to update amount';
        alert('❌ ' + this.actionError);
      }
    });
  }

  toggleEditAmount() {
    this.showEditAmount = !this.showEditAmount;
    if (this.showEditAmount) {
      this.newAmount = this.data?.agreedAmount || 0;
    }
  }

  canPerformActions(): boolean {
    return this.data?.status !== 'completed' && this.data?.status !== 'terminated';
  }
}
