import { Component, OnInit } from '@angular/core';
import {Faq} from "../models/faq";
import {BmmtService} from "../bmmt.service";
import {Contact} from '../models/contact';

@Component({
  selector: 'app-dev-portal',
  templateUrl: './dev-portal.component.html',
  styleUrls: ['./dev-portal.component.css']
})
export class DevPortalComponent implements OnInit {
  private newFaq: Faq;
  newQuestion: string;
  newAnswer: string;

  private newContact: Contact;
  newContactNumber: string;
  newContactEmail: string;
  newContactDepartment: string;



  constructor(private service:BmmtService) {}


  ngOnInit() {
    this.newFaq = new Faq(0,"","");
    this.newContact = new Contact(0,"","","");
    console.log(this.newFaq);
    console.log(this.newContact);

  }

  onSubmit1(question: string, answer: string){
    this.newFaq.setQuestion(question);
    this.newFaq.setAnswer(answer);
    this.service.createFaq(this.newFaq).subscribe();
    console.log(this.newFaq);
  }

  onSubmit2(number: string, email: string, department: string){
    this.newContact.setNumber(number);
    this.newContact.setEmail(email);
    this.newContact.setDepartment(department);
  }

}
