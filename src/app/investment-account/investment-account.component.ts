import { Component, OnInit } from '@angular/core';
import {MoneyAccount} from '../models/money-account';
import {BmmtService} from '../bmmt.service';
import {Transaction} from '../models/transaction';

@Component({
  selector: 'app-investment-account',
  templateUrl: './investment-account.component.html',
  styleUrls: ['./investment-account.component.css']
})
export class InvestmentAccountComponent implements OnInit {
  id = 0;
  accountNumber = 0;
  investment = new MoneyAccount();
  transactions: Transaction[] = [];
  limit = 5;

  constructor(private allService: BmmtService) { }

  ngOnInit(): void {
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'INVESTMENT')
        .subscribe((data: MoneyAccount) => {
          this.investment = data;
        });
    });
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'INVESTMENT')
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
