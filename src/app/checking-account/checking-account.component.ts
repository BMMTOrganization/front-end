import { Component, OnInit } from '@angular/core';
import {UserProfile} from '../models/user-profile';
import {BmmtService} from '../bmmt.service';
import {MoneyAccount} from '../models/money-account';
import {Transaction} from '../models/transaction';

@Component({
  selector: 'app-checking-account',
  templateUrl: './checking-account.component.html',
  styleUrls: ['./checking-account.component.css']
})
export class CheckingAccountComponent implements OnInit {
  id: number;
  accountNumber: number;
  checking: MoneyAccount;
  transactions: any[];
  limit = 5;

  constructor(private allService: BmmtService) { }

  ngOnInit(): void {
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'Checking')
        .subscribe((data: MoneyAccount) => {
          this.checking = data;
        });
    });
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'Checking')
        .subscribe((data: MoneyAccount) => {
          this.allService.findAccountTransactions(data.accountNumber)
            .subscribe(list => this.transactions = list);
        });
    });
  }

  print(): void {
    console.log(this.checking);
  }
}
