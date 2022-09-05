import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  routeToHome(){
    this.router.navigate(['/home']);
  }
  routeToAddCreditCard(){
    this.router.navigate(['/add-credit-card']);
  }
  routeToTransactions(){
    this.router.navigate(['/transactions']);
  }
}
