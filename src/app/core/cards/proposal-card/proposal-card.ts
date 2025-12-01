import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-proposal-card',
  imports: [],
  templateUrl: './proposal-card.html',
  styleUrl: './proposal-card.scss',
})
export class ProposalCard {
 constructor(@Inject('data') public proposal: any) {} //remember to make an interface for this
}
