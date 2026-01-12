import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../services2/collectionService/collection-service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services2/loginService/login-service';
import { Router, RouterModule } from '@angular/router';

interface CollectionGroup {
  name: string;
  icon: string;
  collections: string[];
  isOpen: boolean;
}

@Component({
  selector: 'app-sidebar2',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar2.html',
  styleUrl: './sidebar2.scss',
})
export class Sidebar2 implements OnInit {
  collectionGroups: CollectionGroup[] = [
    {
      name: 'User Management',
      icon: 'bi-people-fill',
      collections: ['users', 'portfolio', 'favorites', 'countries'],
      isOpen: false
    },
    {
      name: 'Categories & Skills',
      icon: 'bi-tags-fill',
      collections: ['categories', 'specialties', 'skills'],
      isOpen: false
    },
    {
      name: 'Jobs & Proposals',
      icon: 'bi-briefcase-fill',
      collections: ['jobs', 'proposals', 'contract'],
      isOpen: false
    },
    {
      name: 'Communication',
      icon: 'bi-chat-dots-fill',
      collections: ['conversations'],
      isOpen: false
    },
    {
      name: 'Payments & Finance',
      icon: 'bi-credit-card-fill',
      collections: ['payment'],
      isOpen: false
    },
    {
      name: 'Settings',
      icon: 'bi-gear-fill',
      collections: ['platform-settings', 'contacts', 'activity-logs'],
      isOpen: false
    }
  ];
  
  constructor(
    private collectionService: CollectionService,
    private loginService: LoginService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      // Collections are now statically defined in groups
    }
  }
  
  onCollectionClick(name: string) {
    // Navigate to the collection route
    this.router.navigate(['/dashboard', name]);
  }

  goToDashboard() {
    // Navigate to dashboard home
    this.router.navigate(['/dashboard']);
  }

  toggleGroup(group: CollectionGroup) {
    group.isOpen = !group.isOpen;
  }
}
