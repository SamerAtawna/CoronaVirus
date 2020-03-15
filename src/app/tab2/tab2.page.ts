import { Component } from '@angular/core';
import { HttpService } from '../Services/http.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  nums;
  constructor(private httpService: HttpService) {}

  ionViewWillEnter(){
    this.httpService.getNumbers().subscribe(num=>{
      console.log(num);
      this.nums = num;
    })
  }

}
