import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-proposal-card',
  imports: [CommonModule],
  templateUrl: './proposal-card.html',
  styleUrl: './proposal-card.scss',
})
export class ProposalCard {
 constructor(@Inject('data') public proposals: any) {} //remember to make an interface for this
}
