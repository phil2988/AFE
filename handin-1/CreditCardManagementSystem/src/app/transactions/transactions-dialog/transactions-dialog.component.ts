import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { CreditCard } from 'src/app/misc/entities/credit-card';
import { Transaction } from 'src/app/misc/entities/transaction';
import { DialogData } from '../transactions-list/transactions-list.component';

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
    private service: AppService,
    public dialogRef: MatDialogRef<TransactionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onSubmit(){
    const transaction: Transaction ={
      credit_card: this.data.cardData.find(
        (card) => { 
          return card.card_number == Number(this.transactionForm.controls.card.value!)
        }) as CreditCard,
      amount: +this.transactionForm.controls.amount.value!,
      comment: this.transactionForm.controls.comment.value!,
      currency: this.transactionForm.controls.currency.value!,
      date: new Date(this.transactionForm.controls.date.value!).getTime(),
    }

    this.service.sendApiRequest<Transaction>('POST', "transactions", transaction)
      .subscribe((res) => {
        if(res.status == 201){
          this.data.newTransaction = transaction
          this.dialogRef.close({
            data: this.data
          })
        }
      })
  }
}
