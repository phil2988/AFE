import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { from, Observable, switchMap, of, tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent{
  dataSource = new MatTableDataSource<CreditCard>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'cardholder_name',
    'card_number',
    'csc_code',
    'expiration_date_month',
    'expiration_date_year',
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
