import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css'],
})
export class SavingsComponent implements OnInit {
  transactions: any[] = [];
  acno: string;
  user: any;
  userTransactions: any[];

  constructor() {}

  showWithdrawForm = false;
  showDepositForm = false;
  showTransferForm = false;

  ngOnInit() {
    let userData = localStorage.getItem('currentUser');
    this.user = userData ? JSON.parse(userData) : {};
    console.log(this.user);

    // getting all the transactions
    let transactions = localStorage.getItem('Transactions');
    this.transactions = transactions ? JSON.parse(transactions) : [];
    console.log(this.transactions);
    let currentUserTransactions = this.transactions.filter(
      (transaction: any) => {
        return transaction.AcNo === this.user.account;
      }
    );
    console.log(currentUserTransactions,'current');
    let balance: number = 0;
    let totalBalance: number = 0;
    this.userTransactions = currentUserTransactions.map((transaction: any) => {
      if (transaction.credit) {
        totalBalance += Number(transaction.credit);
        balance = totalBalance;
        return (transaction = { ...transaction, balance });
      } else if (transaction.debit) {
        totalBalance -= transaction.debit;
        balance = totalBalance;
        return (transaction = { ...transaction, balance });
      }
    });
    console.log(currentUserTransactions);
    console.log(this.userTransactions);
  }
}
