import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../../services2/contactService/contact.service';

@Component({
  selector: 'app-view-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-contact.html',
  styleUrl: './view-contact.scss',
  encapsulation: ViewEncapsulation.None
})
export class ViewContact {
  adminNotes: string = '';
  selectedStatus: string = '';
  isSaving: boolean = false;

  constructor(
    @Inject('data') public data: any,
    @Inject('onClose') private onClose: () => void,
    private contactService: ContactService
  ) {
    this.adminNotes = this.data?.adminNotes || '';
    this.selectedStatus = this.data?.status || 'new';
  }

  close() {
    this.onClose();
  }

  getStatusClass(): string {
    switch (this.data?.status) {
      case 'new':
        return 'badge bg-primary';
      case 'in_progress':
        return 'badge bg-warning text-dark';
      case 'resolved':
        return 'badge bg-success';
      case 'archived':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  }

  getStatusLabel(status?: string): string {
    const s = status || this.data?.status;
    switch (s) {
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

  formatDate(date: any): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  }

  saveChanges() {
    this.isSaving = true;
    
    const updateData: any = {};
    
    if (this.selectedStatus !== this.data?.status) {
      updateData.status = this.selectedStatus;
    }
    
    if (this.adminNotes !== (this.data?.adminNotes || '')) {
      updateData.adminNotes = this.adminNotes;
    }
    
    if (Object.keys(updateData).length === 0) {
      this.isSaving = false;
      return;
    }
    
    this.contactService.updateContactStatus(this.data._id, updateData).subscribe({
      next: (response) => {
        this.data.status = response.status;
        this.data.adminNotes = response.adminNotes;
        this.data.resolvedAt = response.resolvedAt;
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error updating contact:', err);
        this.isSaving = false;
      }
    });
  }
}
