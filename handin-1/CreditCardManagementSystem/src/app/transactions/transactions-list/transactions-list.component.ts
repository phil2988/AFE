import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';
import { Transaction } from 'src/app/entities/transaction';
import { TransactionsDialogComponent } from '../transactions-dialog/transactions-dialog.component';

@Component({
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
    public dialog: MatDialog)
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
        console.log(res.body)
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

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.credit_card.card_number}`;
  }

  addTransaction(){
    this.dialog.open(TransactionsDialogComponent, {
      data: this.cards
    })
  }

  removeTransaction(){
    console.log("Remove")
  }
}
