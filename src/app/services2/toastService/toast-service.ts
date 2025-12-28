import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

/**
 * Toast Notification Service
 * Manages toast notifications throughout the application
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);
  private idCounter = 0;

  /**
   * Get observable of all active toasts
   */
  getToasts(): Observable<Toast[]> {
    return this.toasts$.asObservable();
  }

  /**
   * Show success toast
   */
  success(message: string, duration = 3000) {
    this.show(message, 'success', duration);
  }

  /**
   * Show error toast
   */
  error(message: string, duration = 5000) {
    this.show(message, 'error', duration);
  }

  /**
   * Show info toast
   */
  info(message: string, duration = 3000) {
    this.show(message, 'info', duration);
  }

  /**
   * Show warning toast
   */
  warning(message: string, duration = 4000) {
    this.show(message, 'warning', duration);
  }

  /**
   * Show toast notification
   */
  private show(message: string, type: Toast['type'], duration: number) {
    const toast: Toast = {
      id: ++this.idCounter,
      message,
      type,
      duration
    };

    const currentToasts = this.toasts$.value;
    this.toasts$.next([...currentToasts, toast]);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => this.remove(toast.id), duration);
    }
  }

  /**
   * Remove toast by id
   */
  remove(id: number) {
    const currentToasts = this.toasts$.value;
    this.toasts$.next(currentToasts.filter(t => t.id !== id));
  }

  /**
   * Clear all toasts
   */
  clear() {
    this.toasts$.next([]);
  }
}
