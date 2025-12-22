import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-view-proposal',
  imports: [],
  templateUrl: './view-proposal.html',
  styleUrl: './view-proposal.scss',
})
export class ViewProposal {
  constructor(
    @Inject('data') public data: any,   // Injecting data passed from parent
    @Inject('onClose') private onClose: () => void  // Injecting close function
  ) { }

  // Close the modal
  close() {
    this.onClose();  // Trigger onClose function passed from the parent
  }
}
