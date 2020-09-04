import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.model).subscribe(
      next => {
        console.log('login succeeded');
      },
      error => {
        console.log(error);
      }
    );

  }

  loggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
