import { Injectable } from '@angular/core';
import {MoneyAccount} from './models/money-account';
import {UserProfile} from './models/user-profile';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Transaction} from './models/transaction';

@Injectable({
  providedIn: 'root'
})
export class BmmtService {
  private userId = new BehaviorSubject<number>(0);
  currentUser = this.userId.asObservable();

  checking: MoneyAccount;
  savings: MoneyAccount;
  investment: MoneyAccount;
  // currentUser: UserProfile;
  headers: HttpHeaders;
  mainUrl: string;

  constructor(private http: HttpClient) {
    this.mainUrl = 'http://localhost:8080';
    this.headers = new HttpHeaders({'Content-Type' : 'application/json'});
    // this.findByUserName('GREGDON13').subscribe(user => this.currentUser = user);
  }

  setUser(id: number): void {
    this.userId.next(id);
  }

  // account methods

  findAccountByUserName(userName: string, accountType: string): Observable<MoneyAccount> {
    return this.http.get<MoneyAccount>(this.mainUrl + `/account/user/` + userName + `/` + accountType);
  }

  createAccount(moneyAccount: MoneyAccount): Observable<MoneyAccount> {
    const body = JSON.stringify(moneyAccount);
    return this.http.post<MoneyAccount>(`${this.mainUrl}/account`, body);
  }

  deleteAccount(accountNumber: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mainUrl}/delete/${accountNumber}`);
  }

  userSingleAccount(userId: number, accountName: string): Observable<MoneyAccount> {
    return this.http.get<MoneyAccount>(`${this.mainUrl}/account/user/${userId}/${accountName}`);
  }

  withdrawFunds(accountNumber: number, amount: number): Observable<MoneyAccount> {
    return this.http.put<MoneyAccount>(`${this.mainUrl}/account/withdraw/${accountNumber}/${amount}`, this.headers);
  }

  depositFunds(amount: number, accountNumber: number): Observable<MoneyAccount> {
    return this.http.put<MoneyAccount>(`${this.mainUrl}/account/deposit/${accountNumber}/${amount}`, this.headers);
  }

  transferFunds(amount: number, accountOne: number, accountTwo: number): Observable<MoneyAccount> {
    return this.http.put<MoneyAccount>(`${this.mainUrl}/account/transfer/${accountOne}/${accountTwo}/${amount}`, this.headers);
  }

  // transaction methods

  findAllTransactions(): Observable<Iterable<Transaction>> {
    return this.http.get<Iterable<Transaction>>(`${this.mainUrl}/transaction/all`);
  }

  findUserTransactions(userId: number): Observable<any> {
    return this.http.get(`${this.mainUrl}/transaction/user/${userId}`);
  }

  findAccountTransactions(accountNumber: number): Observable<any> {
    return this.http.get(`${this.mainUrl}/transaction/account/${accountNumber}`);
  }

  createNewTransaction(transaction: Transaction): Observable<Transaction> {
    const body = JSON.stringify(transaction);
    return this.http.post<Transaction>(`${this.mainUrl}/transaction`, body);
  }

  // user methods

  public findByUserName(userName: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.mainUrl + `/user/username/${userName}`);
  }
}
