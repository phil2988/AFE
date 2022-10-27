import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    loadChildren: () => import(
      '../home-screen/home-screen.module'
    ).then(r => r.HomeScreenModule) 
  },
  { 
    path: 'transactions', 
    loadChildren: () => import(
      '../transactions/transactions.module'
    ).then(r => r.TransactionsModule)
  },
  { 
    path: 'add-credit-card', 
    loadChildren: () => import(
      '../add-credit-card/add-credit-card.module'
    ).then(r => r.AddCreditCardModule) 
  },
  { 
    path: 'credit-card-details', 
    loadChildren: () => import(
      '../credit-card-details/credit-card-details.module'
    ).then(r => r.CreditCardDetailsModule) 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})

export class AppRoutingModule {

}
