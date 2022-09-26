import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { AddCreditCardModule } from './add-credit-card/add-credit-card.module';
import { HomeScreenModule } from './home-screen/home-screen.module';
import { NavigationComponent } from './navigation/navigation.component';
import { AppService } from './app.service';
import { CreditCardDetailsModule } from './credit-card-details/credit-card-details.module';

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
