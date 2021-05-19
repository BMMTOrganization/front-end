import {Transaction} from './transaction';

export class MoneyAccount{
  public id: number;
  public accountType: string;
  public balance: number;
  public accountNumber: number;
  public userId: number;
  public transactions: Transaction[];

  // constructor(id: number, accountType: string, balance: number, accountNumber: number, userId: number, transactions: Transaction[]) {
  //   this.id = id;
  //   this.accountType = accountType;
  //   this.balance = balance;
  //   this.accountNumber = accountNumber;
  //   this.userId = userId;
  //   this.transactions = transactions;
  // }

  constructor() {
    this.id = 0;
    this.accountType = '';
    this.balance = 0;
    this.accountNumber = 0;
    this.userId = 0;
    this.transactions = [];
  }
}
