import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-job-card',
  imports: [],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  private deleteCallback: (id: string) => void;

  constructor(
    @Inject('data') public job: any,
    @Inject('viewDetailsCallback') private viewDetailsCallback: (job: any) => void,
    @Inject('deleteCallback') deleteCallback: (id: string) => void,

  ) {
    this.deleteCallback = deleteCallback;
  }

  onViewDetails() {
    this.viewDetailsCallback(this.job);
  }

  onDeleteClick() {
    this.deleteCallback(this.job._id);
  }
}
