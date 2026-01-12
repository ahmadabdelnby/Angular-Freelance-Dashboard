import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-platform-settings-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './platform-settings-card.html',
  styleUrl: './platform-settings-card.scss',
})
export class PlatformSettingsCard implements OnInit {
  settings: any = {};
  isLoading = true;
  isSaving = false;
  message = '';
  messageType = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.isLoading = true;
    this.http.get(`${environment.apiUrl}/platform-settings`).subscribe({
      next: (data: any) => {
        this.settings = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading settings:', err);
        this.isLoading = false;
        this.showMessage('Failed to load settings', 'error');
      }
    });
  }

  saveSettings() {
    this.isSaving = true;
    this.http.patch(`${environment.apiUrl}/platform-settings`, this.settings).subscribe({
      next: (response: any) => {
        this.settings = response.settings;
        this.isSaving = false;
        this.showMessage('Settings saved successfully!', 'success');
      },
      error: (err) => {
        console.error('Error saving settings:', err);
        this.isSaving = false;
        this.showMessage('Failed to save settings', 'error');
      }
    });
  }

  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
