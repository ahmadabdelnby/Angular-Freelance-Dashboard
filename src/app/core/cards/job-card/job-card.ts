import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-job-card',
  imports: [],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
   constructor(@Inject('data') public job: any) {}
}
