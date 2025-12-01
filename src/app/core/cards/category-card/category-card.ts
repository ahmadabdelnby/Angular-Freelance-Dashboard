import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {
   constructor(@Inject('data') public category: any) {}
}
