import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformSettingsCard } from '../../core/cards2/platform-settings-card/platform-settings-card';

@Component({
  selector: 'app-platform-settings-page',
  standalone: true,
  imports: [CommonModule, PlatformSettingsCard],
  template: `
    <div class="platform-settings-page">
      <div class="page-header">
        <h2><i class="bi bi-sliders me-2"></i>Platform Settings</h2>
        <p class="text-muted">Configure platform-wide settings, commission rates, and feature toggles</p>
      </div>
      <app-platform-settings-card></app-platform-settings-card>
    </div>
  `,
  styles: [`
    .platform-settings-page {
      padding: 1rem;
    }
    
    .page-header {
      margin-bottom: 1.5rem;
      
      h2 {
        color: var(--herfa-primary);
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
    }
  `]
})
export class PlatformSettingsPage {}
