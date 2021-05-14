import { Component, OnInit } from '@angular/core';
import {BmmtService} from '../bmmt.service';
import {UserProfile} from '../models/user-profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private user: UserProfile;
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  occupation: string;
  userName: string;
  password: string;
  userAccounts: number[];
  constructor(private service: BmmtService) {
 }

  ngOnInit(): void{
    this.user = new UserProfile(0, '', '', '',
      '', '', '', '', '', []);
    console.log(this.user);
  }
  onOpen( firstName: string,
          lastName: string,
          address: string,
          email: string,
          phoneNumber: string,
          occupation: string,
          userName: string,
          password: string,
          userAccounts: number[] ): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.occupation = occupation;
    this.userName = userName;
    this.password = password;
    this.userAccounts = userAccounts;
    this.service.createUserProfile(this.user).subscribe();
  }
}
