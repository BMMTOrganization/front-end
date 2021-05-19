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
  id = 0;
  accountNumber = 0;
  checking = new MoneyAccount();
  transactions: Transaction[] = [];
  limit = 5;
  error = '';

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
    this.allService.currentUser.subscribe(id => this.id = id);
  }

  print(): void {
    this.allService.currentUser.subscribe(id => {
      this.allService.userSingleAccount(id, 'Checking')
        .subscribe((data: MoneyAccount) => {
        console.log(data);
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

  closeAccount(): boolean {
    if (this.checking.balance !== 0) {
      return false;
    } else {
      // account is zero
      return true;
    }
  }

  deleteAccount(): void {
    if (this.closeAccount()) {
      this.allService.deleteById(this.checking.id).subscribe();
    } else {
      window.alert('Account needs to be emptied out');
    }
  }
}
