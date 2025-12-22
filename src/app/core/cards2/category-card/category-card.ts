import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {
   constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) { }

  update() {
    this.onAction({ action: 'update', data: this.data });
  }


  delete() {
    // Emit the delete action to parent
    this.onAction({ action: 'delete', data: this.data });
  }
}
