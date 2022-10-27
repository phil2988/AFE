import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './misc/app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCreditCardModule } from './add-credit-card/add-credit-card.module';
import { AppService } from './app.service';
import { CreditCardDetailsModule } from './credit-card-details/credit-card-details.module';
import { HomeScreenModule } from './home-screen/home-screen.module';
import { NavigationComponent } from './misc/navigation/navigation.component';
import { TransactionsModule } from './transactions/transactions.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    HomeScreenModule,
    AddCreditCardModule,
    CreditCardDetailsModule,
    TransactionsModule,

    BrowserAnimationsModule,

    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [ AppService],
  bootstrap: [AppComponent],
})
export class AppModule { }
