import { Component, OnInit } from '@angular/core';
import {MoneyAccount} from '../models/money-account';
import {BmmtService} from '../bmmt.service';
import {Transaction} from '../models/transaction';

@Component({
  selector: 'app-savings-account',
  templateUrl: './savings-account.component.html',
  styleUrls: ['./savings-account.component.css']
})
export class SavingsAccountComponent implements OnInit {
  id = 0;
  accountNumber = 0;
  savings = new MoneyAccount();
  transactions: Transaction[] = [];
  limit = 5;

  constructor(private allService: BmmtService) { }

  ngOnInit(): void {
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'SAVINGS')
        .subscribe((data: MoneyAccount) => {
          this.savings = data;
        });
    });
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'SAVINGS')
        .subscribe((data: MoneyAccount) => {
          this.allService.findAccountTransactions(data.accountNumber)
            .subscribe(list => this.transactions = list);
        });
    });
  }

  showMoreItems(): void {
    if (this.limit < 25) {
      this.limit += 5;
    }
  }

  showLessItems(): void {
    if (this.limit > 5){
      this.limit -= 5;
    }
  }

}
