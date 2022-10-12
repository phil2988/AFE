import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MsToDatePipe } from '../ms-to-date.pipe';
import { TransactionsDialogComponent } from './transactions-dialog/transactions-dialog.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    TransactionsPageComponent,
    TransactionsListComponent,
    MsToDatePipe,
    TransactionsDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
  ],
  exports:[
    TransactionsListComponent
  ]
})
export class TransactionsModule { }
