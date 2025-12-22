import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-speciality-card',
  imports: [],
  templateUrl: './speciality-card.html',
  styleUrl: './speciality-card.scss',
})
export class SpecialityCard {
   constructor(
    @Inject('data') public data: any,
    @Inject('onAction') private onAction: (event: { action: string; data: any }) => void
  ) { }

  update() {
    this.onAction({ action: 'update', data: this.data });
  }


  delete() {
    // Emit the delete action to parent
    this.onAction({ action: 'delete', data: this.data });
  }
}
