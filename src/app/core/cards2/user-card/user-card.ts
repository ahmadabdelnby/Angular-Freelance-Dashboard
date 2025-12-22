import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
 constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) { }

  // Called when the View button is clicked
  view() {
    this.onAction({ action: 'view', data: this.data });
  }


  // Called when the Delete button is clicked
  delete() {
    // Emit the delete action to parent
    this.onAction({ action: 'delete', data: this.data });
  }

}
