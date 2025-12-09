import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  data: any;
  private deleteCallback: (id: string) => void;
  constructor(@Inject('data') public user: any, @Inject('deleteCallback') deleteCallback: (id: string) => void) {
    this.data = user;
    this.deleteCallback = deleteCallback;
  }

  onDeleteClick() {
    this.deleteCallback(this.user._id);
  }

}
