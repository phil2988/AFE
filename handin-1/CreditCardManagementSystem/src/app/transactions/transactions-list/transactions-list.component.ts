import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatRecycleRows, MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Transaction } from 'src/app/entities/transaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent {
  dataSource = new MatTableDataSource<Transaction>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[] = [
    'credit_card_number',
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
      console.log(res)
      if(res.status == 200){
        this.dataSource.data = res.body as Transaction[]
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
