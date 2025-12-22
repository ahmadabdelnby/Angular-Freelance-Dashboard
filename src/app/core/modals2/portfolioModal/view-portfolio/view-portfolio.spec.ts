import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPortfolio } from './view-portfolio';

describe('ViewPortfolio', () => {
  let component: ViewPortfolio;
  let fixture: ComponentFixture<ViewPortfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPortfolio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPortfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
