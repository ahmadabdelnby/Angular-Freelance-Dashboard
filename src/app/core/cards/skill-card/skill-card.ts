import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  imports: [],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.scss',
})
export class SkillCard {
  //constructor(@Inject('data') public skills: any) {} 
  data: any;
  private deleteCallback: (id: string) => void;
  private updateCallback: (id: string) => void;

  constructor(
    @Inject('data') public skills: any,
    @Inject('deleteCallback') deleteCallback: (id: string) => void,
    @Inject('updateCallback') updateCallback: (skill: any) => void) {
    this.data = skills;
    this.deleteCallback = deleteCallback;
    this.updateCallback = updateCallback;

  } //remember to make an interface for this

  onDeleteClick() {
    this.deleteCallback(this.skills._id);
  }

  //update skill
  onUpdateClick() {
    this.updateCallback(this.skills);; // send skill object to parent
  }
}
