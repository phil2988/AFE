import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { from, Observable, switchMap, of, tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent{
  dataSource$ = new Observable<CreditCard[]>();
  displayedColumns: string[] = [
    'cardholder_name',
    'card_number',
    'csc_code',
    'expiration_date_month',
    'expiration_date_year',
    'issuer'
  ];

  constructor(private service: AppService, private http: HttpClient){
    this.service.sendApiRequest<CreditCard[]>(
      'GET',
      "credit_cards"
    ).subscribe((res) => {
      if(res.status == 200){
        this.dataSource$ = of(res.body as CreditCard[])
        console.log("Completed!")
      }
    })
  }
}
