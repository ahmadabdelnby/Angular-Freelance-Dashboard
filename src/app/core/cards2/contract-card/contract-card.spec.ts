import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCard } from './contract-card';

describe('ContractCard', () => {
  let component: ContractCard;
  let fixture: ComponentFixture<ContractCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
