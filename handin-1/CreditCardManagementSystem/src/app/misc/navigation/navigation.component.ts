import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationService } from './navigation.service';

@Component({
  standalone: true,
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  imports:[
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule
  ]
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
