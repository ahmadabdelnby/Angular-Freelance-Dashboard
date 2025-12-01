import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-speciality-card',
  imports: [],
  templateUrl: './speciality-card.html',
  styleUrl: './speciality-card.scss',
})
export class SpecialityCard {
   constructor(@Inject('data') public speciality: any) {}
}
