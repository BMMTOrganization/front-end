import { Component, OnInit } from '@angular/core';
import {BmmtService} from '../bmmt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: number;
  username = '';
  password = '';

  constructor(private allService: BmmtService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.allService.findByUserName(this.username)
       .subscribe(data => {console.log('test', data); this.allService.setUser(data.id); }, error => {});
  }

}
