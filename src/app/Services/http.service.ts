import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {filter} from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  dataSub: BehaviorSubject<any>;
  api = "https://mutualmemories.herokuapp.com/sc"
  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get(this.api);
  }

}
