import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/entities/credit-card';
import { Transaction } from 'src/app/entities/transaction';

@Component({
  selector: 'app-transactions-dialog',
  templateUrl: './transactions-dialog.component.html',
  styleUrls: ['./transactions-dialog.component.css']
})
export class TransactionsDialogComponent {
  selectedValue!: string;

  transactionForm = new FormGroup({
    card: new FormControl('', [
      Validators.required
    ]),
    amount: new FormControl('', [
      Validators.pattern("^[0-9]*$"),
      Validators.required
    ]),
    comment: new FormControl('', [

    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    currency: new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreditCard[] =  [],
    private service: AppService) {

  }

  onSubmit(){
    const transaction: Transaction ={
      credit_card: this.data.find((card) => {card.card_number == +this.transactionForm.controls.card.value!}) as CreditCard,
      amount: +this.transactionForm.controls.amount.value!,
      comment: this.transactionForm.controls.comment.value!,
      currency: this.transactionForm.controls.currency.value!,
      date: new Date(this.transactionForm.controls.date.value!).getMilliseconds(),
    }

    console.log(this.transactionForm)

    this.service.sendApiRequest<Transaction>
    (
      'POST',
      "transactions",
      transaction
    ).subscribe((res) => {
      if(res.status == 201){
        console.log(res.body)
      }
    })
  }
}
