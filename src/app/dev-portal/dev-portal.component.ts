import { Component, OnInit } from '@angular/core';
import {Faq} from "../models/faq";
import {BmmtService} from "../bmmt.service";

@Component({
  selector: 'app-dev-portal',
  templateUrl: './dev-portal.component.html',
  styleUrls: ['./dev-portal.component.css']
})
export class DevPortalComponent implements OnInit {

  newQuestion: string;
  answer: string;
  private newFaq: Faq;

  constructor(private service:BmmtService) {}


  ngOnInit() {
    this.newFaq = new Faq(0,"","");
    console.log(this.newFaq);

  }

  onSubmit(question: string, answer: string){
    this.newFaq.setQuestion(question);
    this.newFaq.setAnswer(answer);
    this.service.createFaq(this.newFaq).subscribe();
    console.log(this.newFaq);
  }

}
