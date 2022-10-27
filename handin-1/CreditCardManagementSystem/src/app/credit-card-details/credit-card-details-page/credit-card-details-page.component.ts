import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/misc/entities/credit-card';

@Component({
  selector: 'app-credit-card-details-page',
  templateUrl: './credit-card-details-page.component.html',
  styleUrls: ['./credit-card-details-page.component.css']
})
export class CreditCardDetailsPageComponent {
  cardNumber: number | undefined;
  card$!: CreditCard;
  service: AppService

  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {
    this.service = appService
    this.route.queryParams.subscribe({
      next: (params) => {
        // Should use an uid instead, but data does not have a uid defined
        this.cardNumber = params['cardNumber']
      }
    })
    this.service.sendApiRequest<CreditCard>
    (
      'GET', 
      "credit_cards/" + this.cardNumber
    ).subscribe((res) => {
      if(res.status == 200){
        this.card$ = res.body as CreditCard
      }
    })
  }

  deleteCard(){
    this.service.sendApiRequest<CreditCard>
    (
      'DELETE', 
      "credit_cards/" + this.cardNumber
    ).subscribe((res) => {
      if(res.status == 200){
        console.log(res.body)
        this.router.navigateByUrl("/")
      }
    })
  }
}
