import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-job',
  imports: [CommonModule],
  templateUrl: './view-job.html',
  styleUrl: './view-job.scss',
})
export class ViewJob {


  //the parent already fetched for all docs of a specific collection
  //on clicking the view button i need to display a specific doc of all these docs without fetching again
  //this doc will be assigned to a variable will be bind upon in template
  //and i need to handle the close button ov the modal
  //i do not know if i need ngOnInit or not
  @Input() data: any;  // instead of @Inject('data') constructor

  // constructor(@Inject('data') public job: any) { }
  @Output() close = new EventEmitter<void>();
  onCancel() {
    this.close.emit();
  }


}


