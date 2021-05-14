export class Contact {
  public id: number;
  public number: string;
  public email: string;
  public department: string;

  // tslint:disable-next-line:variable-name
  constructor(id: number, number: string, email: string, department: string) {
    this.id = id;
    this.number = number;
    this.email = email;
    this.department = department;
  }


  public getId(): number {
    return this.id;
  }

  public setId(value: number) {
    this.id = value;
  }

  public getNumber(): string {
    return this.number;
  }

  public setNumber(value: string) {
    this.number = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string) {
    this.email = value;
  }

  public getDepartment(): string {
    return this.department;
  }

  public setDepartment(value: string) {
    this.department = value;
  }
}
