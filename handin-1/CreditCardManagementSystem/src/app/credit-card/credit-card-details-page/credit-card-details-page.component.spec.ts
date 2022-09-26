import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardDetailsPageComponent } from './credit-card-details-page.component';

describe('CreditCardDetailsPageComponent', () => {
  let component: CreditCardDetailsPageComponent;
  let fixture: ComponentFixture<CreditCardDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
