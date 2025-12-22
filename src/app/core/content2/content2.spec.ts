import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content2 } from './content2';

describe('Content2', () => {
  let component: Content2;
  let fixture: ComponentFixture<Content2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Content2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
