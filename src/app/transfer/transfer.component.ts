import { Component, OnInit } from '@angular/core';
import {BmmtService} from '../bmmt.service';
import {MoneyAccount} from '../models/money-account';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  id: number;
  checkingNumber: number;
  savingsNumber: number;
  investmentNumber: number;
  checkingAcct: MoneyAccount;
  savingsAcct: MoneyAccount;
  investmentAcct: MoneyAccount;
  accountAction: string;
  actAmt: number;
  accounts: any[];
  accountFrom: string;
  accountTo: string;
  errorMessage: string;
  accountFromBalance: number;


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

  printThatShit(): void {
    console.log(this.checkingNumber);
    console.log(this.savingsNumber);
    console.log(this.investmentNumber);
    console.log(this.actAmt);
  }

  submitAction(): void {
    if (this.accountAction === 'WITHDRAW') {
      this.withdraw(this.actAmt);
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
    } else if (this.accountAction === 'DEPOSIT') {
      this.deposit(this.actAmt);
      console.log(this.actAmt);
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
  }

  withdraw(amount: number): void {
    if (this.accountFrom === 'Checking'){
      this.checkingAcct.balance -= amount;
    } else if (this.accountFrom === 'SAVINGS') {
      this.savingsAcct.balance -= amount;
    } else if (this.accountFrom === 'INVESTMENT') {
      this.investmentAcct.balance -= amount;
    }
  }

  deposit(amount: number): void {
    if (this.accountFrom === 'Checking'){
      this.checkingAcct.balance += +amount;
    } else if (this.accountFrom === 'SAVINGS') {
      this.savingsAcct.balance += +amount;
    } else if (this.accountFrom === 'INVESTMENT') {
      this.investmentAcct.balance += +amount;
    }
  }

  accountMaker(): MoneyAccount {
    const dummyAccount = new MoneyAccount();
    dummyAccount.accountType = 'Checking';
    dummyAccount.balance = 4500;
    dummyAccount.accountNumber = 654978321;
    dummyAccount.userId = 23;
    dummyAccount.transactions = [];
    return dummyAccount;
  }

  createAccount(): void {
    // this.allService.findAllUserAccounts(23)
    //   .subscribe(list => console.log(list));
    const makeAccount = this.accountMaker();
    this.allService.createAccount(makeAccount);
  }


}
