import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/misc/entities/credit-card';
import { Transaction } from 'src/app/misc/entities/transaction';
import { MsToDatePipe } from 'src/app/pipes/date-pipe/ms-to-date.pipe';
import { TransactionsDialogComponent } from '../transactions-dialog/transactions-dialog.component';

export interface DialogData{
  cardData: CreditCard[],
  newTransaction: Transaction 
}

@Component({
  standalone: true,
  imports:[
    DecimalPipe,
    MsToDatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements AfterViewInit {
  @Input() specificCard: number | undefined = undefined
  @Input() addDeleteButton: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  cards = <CreditCard[]>[]
  dataSource = new MatTableDataSource<Transaction>();
  selection = new SelectionModel<Transaction>(true, []);

  displayedColumns: string[] = [
    'select',
    'card_number',
    'amount',
    'comment',
    'date',
    'currency',
  ];

  constructor(
    private service: AppService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private router: Router)
  {
    this.service.sendApiRequest<Transaction[]>(
      'GET',
      "transactions"
    ).subscribe((res) => {
      if(res.status != 200){
        return
      }
      if(this.specificCard == undefined){
        this.dataSource.data = res.body as Transaction[]
        return
      }
      const sorted = (res.body as Transaction[])
        .filter((transaction) => {
          return transaction.credit_card.card_number == this.specificCard
        })
      this.dataSource.data = sorted
    })

    this.service.sendApiRequest<CreditCard[]>
    (
      'GET',
      "credit_cards"
    ).subscribe((res) => {
      if(res.status == 200){
        this.cards = res.body as CreditCard[]
      }
    })

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

    this.dataSource.sortingDataAccessor = (transaction, property) => {
      switch (property) {
        case 'card_number':
          return transaction.credit_card.card_number.toString()
        case 'amount':
          return transaction.amount.toString()
        case 'comment':
          return transaction.comment as string
        case 'currency':
          return transaction.currency as string
        case 'date':
          return new Date(transaction.date).toDateString()
        case 'uid':
          return transaction.uid as string
        default:
          console.log("Error!")
          return ""
      }
    };

    this.dataSource.filterPredicate = function(transaction, filter: string): boolean {
      return transaction.credit_card.card_number.toString().includes(filter) ||
        transaction.amount.toString().includes(filter) ||
        transaction.comment.toLowerCase().includes(filter) ||
        transaction.currency.toLowerCase().includes(filter) ||
        new Date(transaction.date).toDateString().toLowerCase().includes(filter)
    };

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.filteredData);
  }

  checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.credit_card.card_number}`;
  }

  addTransaction(){
    const dialogRef = this.dialog.open(TransactionsDialogComponent, {
      data: <DialogData>{ cardData: this.cards, newTransaction : {}}
    })

    dialogRef.afterClosed().subscribe((res) => {
      if(res){
        this.dataSource.data.push(res.data.newTransaction)
      }
      this.refresh()
    })
  }

  removeTransaction(){
    this.selection.selected.forEach((transaction) => {
      this.service.sendApiRequest<Transaction>('DELETE', 'transactions/' + transaction.uid)
        .subscribe((res)=>{
          if(res.status == 200){
            this.dataSource.data.splice(this.dataSource.data.findIndex((x) => {
              x.uid === transaction.uid
            }), 1)
          }
        })
    })
    this.refresh()
  }

  refresh(){
    // Sorry not sorry
    this.router.navigateByUrl("/").then(()=>{this.router.navigateByUrl("transactions")})
  }
}
