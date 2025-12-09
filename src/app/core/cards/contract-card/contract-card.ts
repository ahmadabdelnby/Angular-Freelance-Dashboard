import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-contract-card',
  imports: [CommonModule],
  templateUrl: './contract-card.html',
  styleUrl: './contract-card.scss',
})
export class ContractCard {
  constructor(@Inject('data') public contracts: any) {}
}
