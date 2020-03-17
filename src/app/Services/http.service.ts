import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {filter} from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  dataSub: BehaviorSubject<any>;
  api = "https://mutualmemories.herokuapp.com"
  // api = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  getCountries(){
    console.log("getCOuntries service")
    return this.http.get(this.api+"/sc");
  }

  getNumbers(){
 return   this.http.get(this.api+"/nums")
  }
}
