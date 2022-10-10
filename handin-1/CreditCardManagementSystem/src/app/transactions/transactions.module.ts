import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MsToDatePipe } from '../ms-to-date.pipe';

@NgModule({
  declarations: [
    TransactionsPageComponent,
    TransactionsListComponent,
    MsToDatePipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
  ]
})
export class TransactionsModule { }
