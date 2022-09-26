import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCreditCardModule } from './add-credit-card/add-credit-card.module';
import { AppService } from './app.service';
import { CreditCardDetailsModule } from './credit-card-details/credit-card-details.module';
import { HomeScreenModule } from './home-screen/home-screen.module';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeScreenModule,
    CreditCardDetailsModule,

    AddCreditCardModule,

    BrowserAnimationsModule,

    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [ AppService],
  bootstrap: [AppComponent],
})
export class AppModule { }
