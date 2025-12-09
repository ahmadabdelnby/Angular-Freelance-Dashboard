import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-proposal-card',
  imports: [CommonModule],
  templateUrl: './proposal-card.html',
  styleUrl: './proposal-card.scss',
})
export class ProposalCard {
  data: any;
  private deleteCallback: (id: string) => void;

  constructor(@Inject('data') public proposals: any, @Inject('deleteCallback') deleteCallback: (id: string) => void) {
    this.data = proposals;
    this.deleteCallback = deleteCallback;
  } //remember to make an interface for this

  onDeleteClick() {
    this.deleteCallback(this.proposals._id);
  }
}
