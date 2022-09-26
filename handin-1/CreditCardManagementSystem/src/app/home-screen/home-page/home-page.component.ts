import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent{
  dataSource?: CreditCard[];
  displayedColumns: string[] = ['cardholder_name', 'card_number', 'csc_code', 'expiration_date_month', 'expiration_date_year', 'issuer'];

  constructor(private service: AppService){
    this.getData()
  }

  async getData(){
    this.dataSource = (await this.service.sendApiRequest('GET', "http://localhost:3000/credit_cards")).body as CreditCard[];
  }
}
