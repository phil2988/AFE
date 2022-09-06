import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  service: NavigationService;

  constructor(service: NavigationService) {
    this.service = service;
   }
   routeToHome(){
    this.service.routeToUrl("/home")
   }
   routeToAddCreditCard(){
    this.service.routeToUrl("/add-credit-card")
   }

   routeToTransactions(){
    this.service.routeToUrl("/transactions")
   }
}
