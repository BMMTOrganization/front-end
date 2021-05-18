export class Contact {
  public id: number;
  public number: string;
  public email: string;
  public department: string;


  constructor(id: number, phoneNumber: string, email: string, department: string) {
    this.id = id;
    this.number = phoneNumber;
    this.email = email;
    this.department = department;
  }


  public getId(): number {
    return this.id;
  }

  public setId(value: number): void {
    this.id = value;
  }

  public getNumber(): string {
    return this.number;
  }

  public setNumber(value: string): void {
    this.number = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string): void {
    this.email = value;
  }

  public getDepartment(): string {
    return this.department;
  }

  public setDepartment(value: string): void {
    this.department = value;
  }
}
