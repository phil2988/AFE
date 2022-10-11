import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransactionsModule } from '../transactions/transactions.module';
import { CreditCardDetailsPageComponent } from './credit-card-details-page/credit-card-details-page.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';

@NgModule({
  declarations: [
    CreditCardDetailsPageComponent,
    CreditCardDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    TransactionsModule,
    MatButtonModule
  ],
})

export class CreditCardDetailsModule { }
