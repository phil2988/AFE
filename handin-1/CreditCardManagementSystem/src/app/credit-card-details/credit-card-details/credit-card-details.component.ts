import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.css']
})
export class CreditCardDetailsComponent {
  @Input() cardNumber: number | undefined;

  constructor() { }

  
}
