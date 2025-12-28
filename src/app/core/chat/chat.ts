import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollectionService } from '../../services2/collectionService/collection-service';
import { ChatService } from '../../services2/chatService/chat.service';
import { Subscription, interval } from 'rxjs';

interface Conversation {
  _id: string;
  participants: any[];
  lastMessage?: any;
  lastMessageAt: Date;
  unreadCount: number;
  job?: any;
  proposal?: any;
}

interface Message {
  _id: string;
  conversation: string;
  sender: any;
  content: string;
  createdAt: Date;
  isRead: boolean;
  attachments?: any[];
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat implements OnInit, OnDestroy {
  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  isLoading = false;
  isLoadingMessages = false;
  currentUserId: string = '';
  private refreshSubscription?: Subscription;

  constructor(
    private collectionService: CollectionService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.loadConversations();
    // Refresh conversations every 10 seconds
    this.refreshSubscription = interval(10000).subscribe(() => {
      this.loadConversations(false);
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadConversations(showLoading = true) {
    if (showLoading) {
      this.isLoading = true;
    }
    
    this.chatService.getMyConversations().subscribe({
      next: (response) => {
        this.conversations = response.conversations || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading conversations:', error);
        this.isLoading = false;
      }
    });
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    this.loadMessages(conversation._id);
  }

  loadMessages(conversationId: string) {
    this.isLoadingMessages = true;
    this.chatService.getMessages(conversationId).subscribe({
      next: (response) => {
        this.messages = response.messages || [];
        this.isLoadingMessages = false;
        // Mark messages as read
        this.markAllAsRead(conversationId);
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.isLoadingMessages = false;
      }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) {
      return;
    }

    this.chatService.sendMessage(this.selectedConversation._id, this.newMessage).subscribe({
      next: (response) => {
        this.messages.push(response.message);
        this.newMessage = '';
        // Refresh conversations to update last message
        this.loadConversations(false);
      },
      error: (error) => {
        console.error('Error sending message:', error);
      }
    });
  }

  markAllAsRead(conversationId: string) {
    // This will be handled by backend when we open the conversation
  }

  getOtherParticipant(conversation: Conversation): any {
    return conversation.participants.find(p => p._id !== this.currentUserId) || {};
  }

  getParticipantName(participant: any): string {
    if (!participant) return 'Unknown';
    return `${participant.first_name || ''} ${participant.last_name || ''}`.trim() || participant.email || 'Unknown';
  }

  getLastMessagePreview(conversation: Conversation): string {
    if (!conversation.lastMessage) return 'No messages yet';
    return conversation.lastMessage.content?.substring(0, 50) + (conversation.lastMessage.content?.length > 50 ? '...' : '');
  }

  formatTime(date: Date): string {
    const messageDate = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return messageDate.toLocaleDateString();
    }
  }

  isMessageFromCurrentUser(message: Message): boolean {
    return message.sender._id === this.currentUserId;
  }
}
