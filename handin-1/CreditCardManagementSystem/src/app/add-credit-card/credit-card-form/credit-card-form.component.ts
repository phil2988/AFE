import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent {
  creditCardForm: FormGroup;

  constructor(private service: AppService, private router: Router){

    this.creditCardForm = new FormGroup({
      cardHolder: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(16),
        Validators.minLength(7)
      ]),
      cscCode: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
        Validators.maxLength(3)
      ]),
      cardIssuer: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      expirationDate: new FormGroup({
        month: new FormControl('', [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.max(12),
          Validators.min(1)
        ]),
        year: new FormControl('', [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.max(31),
          Validators.min(1)
        ]),
      })
    });
  }

  async submitCard(){
    const card: CreditCard = {
      card_number: this.creditCardForm.get('cardNumber')?.value,
      csc_code: this.creditCardForm.get('cscCode')?.value,
      cardholder_name: this.creditCardForm.get('cardHolder')?.value,
      expiration_date_month: this.creditCardForm.get('expirationDate.month')?.value,
      expiration_date_year: this.creditCardForm.get('expirationDate.year')?.value,
      issuer: this.creditCardForm.get('cardIssuer')?.value
    }
    await this.service.sendApiRequest(
      'POST',
      'http://localhost:3000/credit_cards',
      card
    )
    this.router.navigateByUrl('/')
  }
}
