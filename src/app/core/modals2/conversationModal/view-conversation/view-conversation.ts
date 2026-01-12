import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatService } from '../../../../services2/chatService/chat.service';

@Component({
  selector: 'app-view-conversation',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './view-conversation.html',
  styleUrls: ['./view-conversation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewConversation implements OnInit {
  messages: any[] = [];
  isLoading = false;

  constructor(
    @Inject('data') public data: any,
    @Inject('onClose') private onClose: () => void,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    if (!this.data._id) return;
    
    this.isLoading = true;
    this.chatService.getMessages(this.data._id, 1, 100).subscribe({
      next: (response) => {
        this.messages = response.messages || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.isLoading = false;
      }
    });
  }

  close() {
    this.onClose();
  }

  getParticipantsNames(): string {
    if (!this.data.participants || this.data.participants.length === 0) {
      return 'No participants';
    }
    return this.data.participants
      .map((p: any) => `${p.first_name || ''} ${p.last_name || ''}`.trim() || p.email || 'Unknown')
      .join(' & ');
  }

  getSenderName(sender: any): string {
    if (!sender) return 'Unknown';
    return `${sender.first_name || ''} ${sender.last_name || ''}`.trim() || sender.email || 'Unknown';
  }

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

  getSenderAvatar(sender: any): string {
    if (!sender) return '/user-default-img.png';
    const pic = sender.profile_picture || sender.profile_picture_url || sender.profilePicture;
    return this.getImageUrl(pic);
  }
}
