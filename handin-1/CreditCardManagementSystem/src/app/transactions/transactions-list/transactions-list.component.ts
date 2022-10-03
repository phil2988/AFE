import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Transaction } from 'src/app/entities/transaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent {
  dataSource$ = new Observable<Transaction[]>();
  displayedColumns: string[] = [
    'credit_card_number',
    'amount',
    'comment',
    'date',
    'currency',
  ];

  constructor(private service: AppService) {
    this.service.sendApiRequest<Transaction[]>(
      'GET',
      "transactions"
    ).subscribe((res) => {
      console.log(res)
      if(res.status == 200){
        this.dataSource$ = of(res.body as Transaction[])
      }
    })
   }
}
