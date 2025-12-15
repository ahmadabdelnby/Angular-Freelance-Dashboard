import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpeciality } from './create-speciality';

describe('CreateSpeciality', () => {
  let component: CreateSpeciality;
  let fixture: ComponentFixture<CreateSpeciality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSpeciality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSpeciality);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
