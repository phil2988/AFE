import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';
import { Transaction } from 'src/app/entities/transaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements AfterViewInit {
  @Input() specificCard: number | undefined = undefined

  dataSource = new MatTableDataSource<Transaction>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  selection = new SelectionModel<Transaction>(true, []);

  displayedColumns: string[] = [
    'select',
    'card_number',
    'amount',
    'comment',
    'date',
    'currency',
  ];

  constructor(private service: AppService, private _liveAnnouncer: LiveAnnouncer) {
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
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator

    this.dataSource.sortingDataAccessor = (transaction, property) => {
      if (property === 'card_number') {
        return transaction.credit_card.card_number;
      }
      else {
        console.log("Error!")
        return ""
      }
    };

    // Including credit card number and date in filter
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Transaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.credit_card.card_number}`;
  }

  addTransaction(){
    console.log("Add! ", this.selection.isEmpty())
  }

  removeTransaction(){
    console.log("Remove")
  }
}
