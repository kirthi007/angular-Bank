import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  acno: string;
  fname: string;
  mname: string;
  lname: string;
  balance: number;
  transferAmount: number;
  transactionArray: any;
  newBalance: number;
  accountNumber: number;
  transfer: any;

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
    console.log(this.accountNumber);
    console.log(this.transferAmount);
    

    let timestamp = new Date();

    const withdrawal = {
      date:
        timestamp.getDate() +
        '/' +
        (timestamp.getMonth() + 1) +
        '/' +
        timestamp.getFullYear(),
      credit: '',
      debit: this.transferAmount,
      AcNo: this.acno,
    };

    this.transactionArray.push(withdrawal);
    localStorage.setItem('Transactions', JSON.stringify(this.transactionArray));

   
    if (this.accountNumber) {
      const storedData = localStorage.getItem('userDetails');
      console.log('storedData:', storedData);
      if (storedData) {
        const userData = JSON.parse(storedData);
        console.log('userData:', userData);
        const transfer = userData.find((user: any) => {
          return user.account === String(this.accountNumber);
        });
        console.log('transfer:', transfer.account);

        if (transfer) {
          console.log();
          const deposit = {
            date:
              timestamp.getDate() +
              '/' +
              (timestamp.getMonth() + 1) +
              '/' +
              timestamp.getFullYear(),
            credit: this.transferAmount,
            debit: '',
            
            AcNo: transfer.account,
          };

          this.transactionArray.push(deposit);
          localStorage.setItem(
            'Transactions',
            JSON.stringify(this.transactionArray)
          );

          
        }
      }
    }
  }

}
