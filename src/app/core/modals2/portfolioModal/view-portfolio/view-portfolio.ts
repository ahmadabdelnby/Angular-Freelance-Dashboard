import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-portfolio',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './view-portfolio.html',
  styleUrl: './view-portfolio.scss',
  encapsulation: ViewEncapsulation.None
})
export class ViewPortfolio {
    constructor(
    @Inject('data') public data: any,   // Injecting data passed from parent
    @Inject('onClose') private onClose: () => void  // Injecting close function
  ) { }

  // Close the modal
  close() {
    this.onClose();  // Trigger onClose function passed from the parent
  }

  // Get full image URL
  getImageUrl(path: string | undefined): string {
    if (!path) return '/user-default-img.png';
    
    // If already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Otherwise, construct full URL
    const baseUrl = 'http://localhost:3000';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${baseUrl}/${cleanPath}`;
  }
}
