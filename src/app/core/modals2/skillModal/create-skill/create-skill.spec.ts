import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkill } from './create-skill';

describe('CreateSkill', () => {
  let component: CreateSkill;
  let fixture: ComponentFixture<CreateSkill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSkill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSkill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
