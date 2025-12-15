import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-speciality-card',
  imports: [CommonModule],
  templateUrl: './speciality-card.html',
  styleUrl: './speciality-card.scss',
})
export class SpecialityCard {
  data: any;
  private deleteCallback: (id: string) => void;
  private updateCallback: (id: string) => void;

  constructor(
    @Inject('data') public speciality: any,
    @Inject('deleteCallback') deleteCallback: (id: string) => void,
    @Inject('updateCallback') updateCallback: (skill: any) => void) {
    this.data = speciality;
    this.deleteCallback = deleteCallback;
    this.updateCallback = updateCallback;

  }

  onDeleteClick() {
    this.deleteCallback(this.speciality._id);
  }

  //update skill
  onUpdateClick() {
    this.updateCallback(this.speciality);; // send skill object to parent
  }
}
