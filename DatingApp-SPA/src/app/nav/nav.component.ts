import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  userName: string | null = this.auth.userName();

  constructor(public auth: AuthService,
              private alertify: AlertifyService) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.model).subscribe(
      next => {
        this.alertify.success('login succeeded');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  loggedIn(): boolean {
    return (this.auth.loggedIn());
  }

  logout() {
    this.auth.logOut();
    this.alertify.message('logged out');
  }
}
