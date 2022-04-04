import { Component, OnInit } from '@angular/core';
import { User1Class } from '../models/user1-class';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: User1Class = new User1Class();
  content: any;

  constructor() { }

  ngOnInit() {
  }

  signUp() {
    this.content.scrollToTop();
  }

}
