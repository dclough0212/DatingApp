import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
interface Value {
  id: number;
  name: string;
}


@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})

export class ValueComponent implements OnInit {

  values: Value[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get<Value[]>('http://localhost:5000/api/values').subscribe(
      response => {
        this.values = response;
      },
      error => {
        console.log(error);
      }
    );
  }

}
