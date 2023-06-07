import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent implements OnInit {
  acno: string;
  fname: string;
  mname: string;
  lname: string;

  depositAmount: number;
  transactionArray: any;

  constructor() {}

  ngOnInit() {
    const storedData = localStorage.getItem('currentUser');

    if (storedData) {
      const userData = JSON.parse(storedData);
      this.acno = userData.account;
      this.fname = userData.firstName;
      this.mname = userData.middleName;
      this.lname = userData.lastName;
    }

    const storedTransactions = localStorage.getItem('Transactions');
    this.transactionArray = storedTransactions
      ? JSON.parse(storedTransactions)
      : [];
  }

  onSubmit() {
    console.log(this.depositAmount);

    let timestamp = new Date();

    const deposit = {
      date:
        timestamp.getDate() +
        '/' +
        (timestamp.getMonth() + 1) +
        '/' +
        timestamp.getFullYear(),
      credit: this.depositAmount,
      debit: '',

      AcNo: this.acno,
    };

    this.transactionArray.push(deposit);
    localStorage.setItem('Transactions', JSON.stringify(this.transactionArray));
  }
}
