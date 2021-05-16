export class UserProfile {
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

  constructor(id: number, firstName: string, lastName: string, address: string, email: string, phoneNumber: string,
              occupation: string, userName: string, password: string, userAccounts: number[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.occupation = occupation;
    this.userName = userName;
    this.password = password;
    this.userAccounts = userAccounts;
  }
}
