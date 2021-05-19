import {Component, DoCheck, OnInit} from '@angular/core';
import {Faq} from "../models/faq";
import {BmmtService} from "../bmmt.service";
import {Contact} from '../models/contact';

@Component({
  selector: 'app-help',
  templateUrl: 'help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit, DoCheck{

  public faqs: Faq[] = [];
  answer = '';

  public contacts: Contact[] = [];


  constructor(private service: BmmtService) {
    this.service.getAllFAQs().subscribe((res)=> {
      this.faqs = res;
      console.log(this.faqs);
      console.log(this.faqs[0].id);
      console.log(this.faqs[0].question);
      console.log(this.faqs[0].answer);
    });
    this.service.getAllContacts().subscribe((res)=> {
      this.contacts = res;
    });
  }

  ngOnInit() {
    // console.log(this.faqs);
  }

  ngDoCheck() {
    //console.log('checked');
  }

  share() {
    window.alert(this.answer);
    console.log(this.answer);
  }
  //
  // getAllFaqs(): void{
  //   this.faqService.getAllFAQs().subscribe();
  // }
  //
  // getQuestion(): string {
  //   this.faqService.getFAQById(1).subscribe(faq => this.faqObject.question = faq.question);
  //   return this.faqObject.question;
  // }
  //
  // getAnswer(): string {
  //   this.faqService.getFAQById(1).subscribe(faq => this.faqObject = faq.answer);
  //   return this.faqObject.answer
  // }

}
