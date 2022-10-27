import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsListComponent } from '../transactions/transactions-list/transactions-list.component';
import { TransactionsModule } from '../transactions/transactions.module';
import { CreditCardDetailsPageComponent } from './credit-card-details-page/credit-card-details-page.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';

const routes: Routes = [{path: '', component: CreditCardDetailsPageComponent}]

@NgModule({
  declarations: [
    CreditCardDetailsPageComponent,
    CreditCardDetailsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    TransactionsListComponent
  ],
})

export class CreditCardDetailsModule { }
