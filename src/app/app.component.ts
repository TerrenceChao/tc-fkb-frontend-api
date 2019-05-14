import { Component, OnInit } from '@angular/core';
import { AuthService } from './business/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Ligurritio';
  loggedIn: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signup() {
    // submit registrated data and redirect to logged in page(gate)
  }

  login() {
    this.authService.login();
  }

  forgotPassword() {
    // submit email and send token to email
  }

  resetPassword() {
    // submit updated password and redirect to logged in page(gate)
  }
}
