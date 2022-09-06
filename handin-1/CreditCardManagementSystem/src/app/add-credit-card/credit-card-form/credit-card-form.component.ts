import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent {
  creditCardForm: FormGroup;
  expirationDate: FormGroup;

  constructor(){

    this.expirationDate = new FormGroup({
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
    });

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
      expirationDate: this.expirationDate
    });
  }

  submitCard(){

  }
}
