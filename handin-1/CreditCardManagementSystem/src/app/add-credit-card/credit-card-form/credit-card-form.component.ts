import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent implements OnInit {

  creditCardForm: FormGroup;

  constructor(){
    this.creditCardForm = new FormGroup({
      cardHolder: new FormControl(''),
      cardNumber: new FormControl(''),
      cscCode: new FormControl(''),
      cardIssuer: new FormControl(''),
      expirationDate: new FormGroup({
        month: new FormControl(''),
        year: new FormControl(''),
      }),
    });
  }

  ngOnInit(): void {
  }

  submitCard(){
    alert(
      "Hello " + this.creditCardForm.controls['cardHolder'].value +
      "! with card number " + this.creditCardForm.controls['cardNumber'].value)
  }
}
