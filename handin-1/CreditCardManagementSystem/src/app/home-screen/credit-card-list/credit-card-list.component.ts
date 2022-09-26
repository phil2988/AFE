import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css'],
  providers: [ AppService ],
})
export class CreditCardListComponent{
  dataSource?: CreditCard[];
  displayedColumns: string[] = ['cardholder_name', 'card_number', 'csc_code', 'expiration_date_month', 'expiration_date_year', 'issuer'];

  constructor(private service: AppService){
    this.getData()
  }

  async getData(){
    this.dataSource = (await this.service.sendApiRequest('GET', "http://localhost:3000/credit_cards")).body as CreditCard[];
  }
}
