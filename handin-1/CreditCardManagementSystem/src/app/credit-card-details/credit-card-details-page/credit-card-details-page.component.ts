import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Unsubscribable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';

@Component({
  selector: 'app-credit-card-details-page',
  templateUrl: './credit-card-details-page.component.html',
  styleUrls: ['./credit-card-details-page.component.css']
})
export class CreditCardDetailsPageComponent {
  cardNumber: number | undefined;
  card$!: CreditCard;

  constructor(private service: AppService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.cardNumber = params['cardNumber']
      }
    })
    service.sendApiRequest<CreditCard>(
      'GET', 
      "credit_cards/" + this.cardNumber)
      .subscribe((res) => {
          if(res.status == 200){
            console.log(res.body)
            this.card$ = res.body as CreditCard
          }
        }
      )
  }
}
