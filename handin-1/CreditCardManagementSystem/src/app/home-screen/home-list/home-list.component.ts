import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/misc/entities/credit-card';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css'],
})
export class HomeListComponent{
  dataSource = new MatTableDataSource<CreditCard>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'cardholder_name',
    'card_number',
    'issuer'
  ];

  constructor(
    private service: AppService, 
    private http: HttpClient, 
    private _liveAnnouncer: LiveAnnouncer, 
    private router: Router
  ){
    this.service.sendApiRequest<CreditCard[]>(
      'GET',
      "credit_cards"
    ).subscribe((res) => {
      if(res.status == 200){
        this.dataSource.data = res.body as CreditCard[]
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

  goToDetailsPage(card: CreditCard){
    this.router.navigate(
      ['/credit-card-details'], 
      {queryParams: {
        cardNumber: card.card_number
      }} )
  }
}
