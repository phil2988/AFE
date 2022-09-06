import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCreditCardPageComponent } from './add-credit-card/add-credit-card-page/add-credit-card-page.component';
import { HomePageComponent } from './home-screen/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'add-credit-card', component: AddCreditCardPageComponent },
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
