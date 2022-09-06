import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCreditCardPageComponent } from './add-credit-card-page/add-credit-card-page.component';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AddCreditCardPageComponent,
    CreditCardFormComponent,
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    FormsModule,

    MatInputModule,
    MatButtonModule
  ]
})
export class AddCreditCardModule { }
