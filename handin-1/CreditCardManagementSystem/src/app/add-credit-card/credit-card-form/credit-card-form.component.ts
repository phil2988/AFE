import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, pipe } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';
@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent {
  creditCardForm: FormGroup;

  creditCard?: CreditCard;

  constructor(private appService: AppService){

    this.creditCardForm = new FormGroup({
      cardHolder: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      cscCode: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(100),
        Validators.max(999)
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

    this.submitCard();
  }

  submitCard(){
    this.creditCard = {
      card_number: this.creditCardForm.controls['cardNumber'].value,
      cardholder_name: this.creditCardForm.controls['cardHolder'].value,
      csc_code: this.creditCardForm.controls['cscCode'].value,
      expiration_date_month: this.creditCardForm.controls['expirationDate'].value.month,
      expiration_date_year: this.creditCardForm.controls['expirationDate'].value.year,
      issuer: this.creditCardForm.controls['cardIssuer'].value
    };

    const response = this.appService.sendApiRequest('POST', "credit_cards", this.creditCard)
  }
}
