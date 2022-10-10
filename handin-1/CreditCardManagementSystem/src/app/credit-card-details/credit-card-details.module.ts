import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardDetailsPageComponent } from './credit-card-details-page/credit-card-details-page.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';

@NgModule({
  declarations: [
    CreditCardDetailsPageComponent,
    CreditCardDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})

export class CreditCardDetailsModule { }
