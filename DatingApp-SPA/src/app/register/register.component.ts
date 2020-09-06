import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private auth: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.model).subscribe(
      next => {
        this.alertify.success('registration success');
      },
      error => {
        this.alertify.error(error);
      }, () => {
        this.auth.login(this.model).subscribe(
          next => {
            this.router.navigate(['home']);
          }
        );
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
