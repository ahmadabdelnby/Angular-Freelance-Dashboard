import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services2/toastService/toast-service';

/**
 * Toast Container Component
 * Displays toast notifications
 */
@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.html',
  styleUrls: ['./toast-container.scss']
})
export class ToastContainer implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.getToasts().subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  /**
   * Get icon class for toast type
   */
  getIconClass(type: string): string {
    const icons: { [key: string]: string } = {
      success: 'bi-check-circle-fill',
      error: 'bi-x-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      info: 'bi-info-circle-fill'
    };
    return icons[type] || icons['info'];
  }

  /**
   * Remove toast
   */
  removeToast(id: number) {
    this.toastService.remove(id);
  }

  /**
   * Track toasts by id
   */
  trackById(_: number, toast: Toast) {
    return toast.id;
  }
}
