import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/entities/credit-card';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [ HomePageService ],
})
export class HomePageComponent implements OnInit {
  dataSource$ : Observable<CreditCard[]>;
  displayedColumns: string[] = ['cardholder_name', 'card_number', 'csc_code', 'expiration_date_month', 'expiration_date_year', 'issuer'];

  constructor(private service: HomePageService){
    this.dataSource$ = service.getCreditCardData();
    
    console.log(this.dataSource$)
  }

  ngOnInit(): void {
    
  }
}
