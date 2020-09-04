import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Value {
  id: number;
  name: string;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  values: Value[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.getValues();
  }

  handleRegisterMode(event: boolean) {
    this.registerMode = event;
  }

/*   getValues() {
    this.http.get<Value[]>('http://localhost:5000/api/values').subscribe(
      response => {
        this.values = response;
      },
      error => {
        console.log(error);
      }
    );
  } */

}
