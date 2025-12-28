import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation-card.html',
  styleUrls: ['./conversation-card.scss']
})
export class ConversationCard {
  constructor(
    @Inject('data') public document: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) { }

  onView() {
    this.onAction({ action: 'view', data: this.document });
  }

  onEdit() {
    this.onAction({ action: 'edit', data: this.document });
  }

  onDelete() {
    this.onAction({ action: 'delete', data: this.document });
  }

  getParticipantsNames(): string {
    console.log('📋 Conversation document:', this.document);
    if (!this.document || !this.document.participants || this.document.participants.length === 0) {
      console.warn('⚠️ No participants found');
      return 'No participants';
    }
    console.log('✅ Participants:', this.document.participants);
    return this.document.participants
      .map((p: any) => `${p.first_name || ''} ${p.last_name || ''}`.trim() || p.email || 'Unknown')
      .join(' & ');
  }

  getLastMessagePreview(): string {
    if (!this.document || !this.document.lastMessage) {
      return 'No messages yet';
    }
    const content = this.document.lastMessage.content || '';
    return content.length > 60 ? content.substring(0, 60) + '...' : content;
  }

  getMessageCount(): number {
    return this.document?.messageCount || 0;
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }
}
