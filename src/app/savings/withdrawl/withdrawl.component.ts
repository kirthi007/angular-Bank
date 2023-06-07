import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdrawl',
  templateUrl: './withdrawl.component.html',
  styleUrls: ['./withdrawl.component.css'],
})
export class WithdrawlComponent implements OnInit {
  acno: string;
  fname: string;
  mname: string;
  lname: string;
 
  withdrawalAmount: number;
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

  submitForm() {
    console.log(this.withdrawalAmount);
    
    

    let timestamp = new Date();

    const withdrawal = {
      date:
        timestamp.getDate() +
        '/' +
        (timestamp.getMonth() + 1) +
        '/' +
        timestamp.getFullYear(),
      credit: '',
      debit: this.withdrawalAmount,
    
      AcNo: this.acno,
    };

    this.transactionArray.push(withdrawal);
    localStorage.setItem('Transactions', JSON.stringify(this.transactionArray));

    
  }

  
}
