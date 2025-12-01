import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-portfolio-card',
  imports: [],
  templateUrl: './portfolio-card.html',
  styleUrl: './portfolio-card.scss',
})
export class PortfolioCard {
   constructor(@Inject('data') public portfolioItem: any) {}
}
