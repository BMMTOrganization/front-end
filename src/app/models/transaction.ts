export class Transaction{
  public id: number;
  public transactionDate: Date;
  public accountOne: number;
  public accountTwo: number;
  public transactionType: string;
  public amount: number;
  public userId: number;

  constructor(id: number, transactionDate: Date, accountOne: number, accountTwo: number, transactionType: string,
              amount: number, userId: number) {
    this.id = id;
    this.transactionDate = transactionDate;
    this.accountOne = accountOne;
    this.accountTwo = accountTwo;
    this.transactionType = transactionType;
    this.amount = amount;
    this.userId = userId;
  }
}
