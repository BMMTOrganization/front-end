export class Faq {

  public id: number;
  public question: string;
  public answer: string;

  public constructor(id: number, question: string, answer: string){
    this.id = id;
    this.question = question;
    this.answer = answer;
  }

  public setQuestion(question: string){
    this.question = question;
  }

  public setAnswer(answer: string){
    this.answer = answer;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getAnswer(): string {
    return this.answer;
  }

  public setID(id: number): void {
    this.id = id;
  }
  public getID(): number {
    return this.id;
  }
}
