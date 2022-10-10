import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MsToDatePipe } from '../ms-to-date.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class TransactionsModule { }
