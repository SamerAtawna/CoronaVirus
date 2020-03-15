import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  countries;
  constructor() {}

  setCountries(d) {
    this.countries = d;
  }

  getCountries() {
    return this.countries;
  }
}
