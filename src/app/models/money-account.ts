import {Transaction} from './transaction';

export class MoneyAccount{
  constructor(
  public id: number,
  public accountType: string,
  public balance: number,
  public accountNumber: number,
  public userId: number,
  public transactions: Transaction[]
  ) {}
}
