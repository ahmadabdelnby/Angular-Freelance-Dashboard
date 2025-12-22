import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityCard } from './speciality-card';

describe('SpecialityCard', () => {
  let component: SpecialityCard;
  let fixture: ComponentFixture<SpecialityCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialityCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
