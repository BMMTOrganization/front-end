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

  submitAction(): void {
    // console.log(this.checkingNumber + '  ' + this.actAmt);
    // this.allService.withdrawFunds(this.checkingNumber, this.actAmt);
    this.allService.withdrawFunds(987654321, 20.00);
  }

  accountMaker(): MoneyAccount {
    const dummyAccount = new MoneyAccount();
    dummyAccount.id = 10;
    dummyAccount.accountNumber = 654321789;
    dummyAccount.accountType = 'Checking';
    dummyAccount.balance = 350.24;
    dummyAccount.userId = 25;
    return dummyAccount;
  }

  createAccount(): void {
    // this.allService.findAllUserAccounts(23)
    //   .subscribe(list => console.log(list));
    this.allService.createAccount(this.accountMaker());
  }

  submitAction(): void {
    if (this.accountAction === 'WITHDRAW') {
      this.allService.withdrawFunds(this.checkingNumber, this.actAmt);
      // this.allService.currentUser.subscribe(id => {
      //   this.allService.userSingleAccount(id, this.accountFrom)
      //     .subscribe(data => this.accountFromBalance = data.balance);
      // });
      // if (this.accountFromBalance < this.actAmt) {
      //   this.errorMessage = 'NOT ENOUGH FUNDS';
      // } else {
      //   // catches enough money
      //   this.allService.withdrawFunds(this.checkingNumber, this.actAmt);
      // }
    }
  }
}
