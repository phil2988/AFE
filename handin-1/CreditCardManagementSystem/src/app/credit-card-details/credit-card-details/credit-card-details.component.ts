import { Component, Input, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/misc/entities/credit-card';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.css']
})
export class CreditCardDetailsComponent {
  @Input() creditCard: CreditCard | undefined;

  constructor() { }
}
