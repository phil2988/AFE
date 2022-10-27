import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCreditCardPageComponent } from './add-credit-card-page/add-credit-card-page.component';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{path: '', component: AddCreditCardPageComponent}]

@NgModule({
  declarations: [
    AddCreditCardPageComponent,
    CreditCardFormComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    ReactiveFormsModule,
    FormsModule,

    MatInputModule,
    MatButtonModule
  ],
})
export class AddCreditCardModule { }
