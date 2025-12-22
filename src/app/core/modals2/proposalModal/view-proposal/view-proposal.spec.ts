import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProposal } from './view-proposal';

describe('ViewProposal', () => {
  let component: ViewProposal;
  let fixture: ComponentFixture<ViewProposal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProposal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProposal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
