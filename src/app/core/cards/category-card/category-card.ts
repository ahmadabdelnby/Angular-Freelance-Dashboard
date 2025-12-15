import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [CommonModule],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {
  data: any;
  private deleteCallback: (id: string) => void;
  private updateCallback: (id: string) => void;

  constructor(
    @Inject('data') public category: any,
    @Inject('deleteCallback') deleteCallback: (id: string) => void,
    @Inject('updateCallback') updateCallback: (skill: any) => void) {
    this.data = category;
    this.deleteCallback = deleteCallback;
    this.updateCallback = updateCallback;

  }

  onDeleteClick() {
    this.deleteCallback(this.category._id);
  }

  //update skill
  onUpdateClick() {
    this.updateCallback(this.category); // send skill object to parent
  }
}
