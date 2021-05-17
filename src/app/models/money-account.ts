import {Transaction} from './transaction';

export class MoneyAccount{
  id: number;
  accountType: string;
  balance: number;
  accountNumber: number;
  userId: number;
  transactions: Transaction[];
}
