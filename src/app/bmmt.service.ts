import { Injectable } from '@angular/core';
import {MoneyAccount} from './models/money-account';
import {UserProfile} from './models/user-profile';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Transaction} from './models/transaction';
import {Faq} from './models/faq';
import {Contact} from './models/contact';

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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  // FAQ Methods

  public getAllFAQs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(`${this.mainUrl}/faq/all`);
  }

  createFaq(faq: Faq): Observable<Faq>{
    const body = JSON.stringify(faq);
    console.log(body);
    return this.http.post<Faq>(`${this.mainUrl}/faq`, body, this.httpOptions);
  }

  deleteFAQ(ID: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mainUrl}/faq/${ID}`);
  }

  // Contacts Methods

  public getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.mainUrl}/contact/all`);
  }

  createContact(contact: Contact): Observable<Contact>{
    const body = JSON.stringify(contact);
    console.log(body);
    return this.http.post<Contact>(`${this.mainUrl}/contact`, body, this.httpOptions);
  }

  deleteContact(ID: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.mainUrl}/contact/${ID}`);
  }
}
