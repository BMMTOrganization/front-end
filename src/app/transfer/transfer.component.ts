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
  }

  printThatShit(): void {
    console.log(this.checkingNumber);
    console.log(this.savingsNumber);
    console.log(this.investmentNumber);
    console.log(this.actAmt);
  }

  submitAction(): void {
    this.allService.withdrawFunds(this.checkingNumber, this.actAmt);
  }

  accountMaker(): MoneyAccount {
    const dummyAccount = new MoneyAccount();
    dummyAccount.accountType = 'SAVINGS';
    dummyAccount.balance = 765.23;
    dummyAccount.accountNumber = 654321780;
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
