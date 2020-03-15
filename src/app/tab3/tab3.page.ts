import { Component, ViewEncapsulation } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { HttpService } from "../Services/http.service";
import { Subscription } from "rxjs";
import { Tab1Page } from "../tab1/tab1.page";
import { Router, Route } from "@angular/router";
import { StoreService } from "../Services/store.service";
interface country {
  Country: string;
  ActiveCases: number;
  NewCases: number;
  NewDeaths: number;
  TotalCases: number;
  TotalDeaths: number;
  TotalRecovered: number;
}
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  subscriber: Subscription;

  countries: Array<country> = [];
  columns = [
    { name: "Country" },
    { name: "Active" },
    { name: "Cases" },
    { name: "Deaths" },
    { name: "Recovered" }
  ];
  // (w["country"] = w["ADMIN"]),
  // (w["active"] = w["Active_Cases"]),
  // (w["recovered"] = w["Total_Recovered"]),
  // (w["deaths"] = w["Total_Deaths"]),
  // (w["cases"] = w["Total_Cases"]),
  // (w["newcases"] = w["New_Cases"]),
  // (w["newdeaths"] = w["New_Deaths"]),
  constructor(
    private httpService: HttpService,
    private tab1: Tab1Page,
    private router: Router,
    private store: StoreService
  ) {}

  ionViewWillEnter() {
    console.log("will enter");
    // this.countries = this.httpService.dataSub;
  }

  ionViewWillLeave() {}

  ionViewDidEnter() {
    let d = this.store.getCountries().features;
    let n = [];

    d.forEach(element => {
      n.push(element.properties);
    });
    n.map(w => {
      return (
        delete w["ISO_A3"],
        delete w["ISO_A2"],
        delete w["ISO_A2"],
        (w["country"] = w["ADMIN"]),
        (w["active"] = w["Active_Cases"]),
        (w["recovered"] = w["Total_Recovered"]),
        (w["deaths"] = w["Total_Deaths"]),
        (w["cases"] = w["Total_Cases"]),
        (w["newcases"] = w["New_Cases"]),
        (w["newdeaths"] = w["New_Deaths"]),
        delete w["ADMIN"],
        delete w["Active_Cases"]

      );
    });
    this.countries = [...n];
    console.log(this.countries);
  }
}
