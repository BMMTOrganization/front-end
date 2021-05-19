import { Component, OnInit } from '@angular/core';
import {BmmtService} from '../bmmt.service';
import {MoneyAccount} from '../models/money-account';
import {Transaction} from '../models/transaction';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  id = 0;
  checkingNumber = 0;
  savingsNumber = 0;
  investmentNumber = 0;
  checkingAcct = new MoneyAccount();
  savingsAcct = new MoneyAccount();
  investmentAcct = new MoneyAccount();
  accountAction = '';
  actAmt = 0;
  accounts: MoneyAccount[] = [];
  accountFrom = '';
  accountTo = '';
  errorMessage = '';


  constructor(private allService: BmmtService) { }

  ngOnInit(): void {
    this.allService.currentUser.subscribe(id => {
      this.allService.findAllUserAccounts(id).subscribe(list => this.accounts = list);
    });
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'Checking')
        .subscribe((data: MoneyAccount) => {
          this.checkingNumber = data.accountNumber;
        });
    });
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'SAVINGS')
        .subscribe((data: MoneyAccount) => {
          this.savingsNumber = data.accountNumber;
        });
    });
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'INVESTMENT')
        .subscribe((data: MoneyAccount) => {
          this.investmentNumber = data.accountNumber;
        });
    });
    this.allService.currentUser.subscribe(id => this.id = id);

    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'Checking')
        .subscribe((data: MoneyAccount) => {
          this.checkingAcct = data;
        });
    });
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'SAVINGS')
        .subscribe((data: MoneyAccount) => {
          this.savingsAcct = data;
        });
    });
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'INVESTMENT')
        .subscribe((data: MoneyAccount) => {
          this.investmentAcct = data;
        });
    });
  }


  submitAction(): void {
    if (this.accountAction === 'WITHDRAW') {
      this.withdraw(this.actAmt);
      this.submitWithdraw();
    } else if (this.accountAction === 'DEPOSIT') {
      this.deposit(this.actAmt);
      console.log(this.actAmt);
      this.submitDeposit();
    } else if (this.accountAction === 'TRANSFER') {
      this.withdraw(this.actAmt);
      this.depositTransfer(this.actAmt);
      this.submitWithdraw();
      this.submitTransferDeposit();
    }
  }

  withdraw(amount: number): void {
    if (this.accountFrom === 'Checking'){
      this.checkingAcct.balance -= amount;
    } else if (this.accountFrom === 'SAVINGS') {
      this.savingsAcct.balance -= amount;
    } else if (this.accountFrom === 'INVESTMENT') {
      this.investmentAcct.balance -= amount;
    }
    this.makeTransactionWD();
  }

  deposit(amount: number): void {
    if (this.accountFrom === 'Checking'){
      this.checkingAcct.balance += +amount;
    } else if (this.accountFrom === 'SAVINGS') {
      this.savingsAcct.balance += +amount;
    } else if (this.accountFrom === 'INVESTMENT') {
      this.investmentAcct.balance += +amount;
    }
    this.makeTransactionWD();
  }

  depositTransfer(amount: number): void {
    if (this.accountTo === 'Checking'){
      this.checkingAcct.balance += +amount;
    } else if (this.accountTo === 'SAVINGS') {
      this.savingsAcct.balance += +amount;
    } else if (this.accountTo === 'INVESTMENT') {
      this.investmentAcct.balance += +amount;
    }
  }

  submitWithdraw(): void {
    if (this.accountFrom === 'Checking'){
      this.allService.withdrawFunds(this.checkingNumber, this.checkingAcct)
        .subscribe(account => this.allService.checking = account);
    } else if (this.accountFrom === 'SAVINGS') {
      this.allService.withdrawFunds(this.savingsNumber, this.savingsAcct)
        .subscribe(account => this.allService.savings = account);
    } else if (this.accountFrom === 'INVESTMENT') {
      this.allService.withdrawFunds(this.investmentNumber, this.investmentAcct)
        .subscribe(account => this.allService.investment = account);
    }
  }

  submitDeposit(): void {
    if (this.accountFrom === 'Checking'){
      this.allService.depositFunds(this.checkingNumber, this.checkingAcct)
        .subscribe(account => this.allService.checking = account);
    } else if (this.accountFrom === 'SAVINGS') {
      this.allService.depositFunds(this.savingsNumber, this.savingsAcct)
        .subscribe(account => this.allService.savings = account);
    } else if (this.accountFrom === 'INVESTMENT') {
      this.allService.depositFunds(this.investmentNumber, this.investmentAcct)
        .subscribe(account => this.allService.investment = account);
    }
  }

  submitTransferDeposit(): void {
    if (this.accountTo === 'Checking'){
      this.allService.depositFunds(this.checkingNumber, this.checkingAcct)
        .subscribe(account => this.allService.checking = account);
    } else if (this.accountTo === 'SAVINGS') {
      this.allService.depositFunds(this.savingsNumber, this.savingsAcct)
        .subscribe(account => this.allService.savings = account);
    } else if (this.accountTo === 'INVESTMENT') {
      this.allService.depositFunds(this.investmentNumber, this.investmentAcct)
        .subscribe(account => this.allService.investment = account);
    }
  }

  makeTransactionWD(): void {
    const transaction = new Transaction();
    this.allService.userSingleAccount(this.id, this.accountFrom)
      .subscribe(account => transaction.accountOne = account.accountNumber);
    transaction.transactionDate = new Date();
    transaction.transactionType = this.accountAction;
    transaction.amount = Number(this.actAmt);
    transaction.userId = this.id;
    this.allService.createNewTransaction(transaction);
  }

  makeTransactionT(): void {
    const transaction = new Transaction();
    this.allService.userSingleAccount(this.id, this.accountFrom).subscribe(account => transaction.accountOne = account.accountNumber);
    this.allService.userSingleAccount(this.id, this.accountTo).subscribe(account => transaction.accountTwo = account.accountNumber);
    transaction.transactionDate = new Date();
    transaction.transactionType = this.accountAction;
    transaction.amount = this.actAmt;
    transaction.userId = this.id;
    this.allService.createNewTransaction(transaction);
  }
}
