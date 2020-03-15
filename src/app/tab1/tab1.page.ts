import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { Map, geoJSON, GeoJSONOptions, GeoJSON } from "leaflet";
// import* as a from ''
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../Services/http.service";
import { AdMobFree, AdMobFreeBannerConfig } from "@ionic-native/admob-free/ngx";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  map: Map;
  jsn;
  countries: Array<any>;
  newMarker: any;
  address: string[];
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private admobFree: AdMobFree
  ) {}
  ngOnInit() {
    const bannerConfig: AdMobFreeBannerConfig = {
      autoShow: true,
      id: "ca-app-pub-2213555762660469/3823241819"
     };
     this.admobFree.banner.config(bannerConfig);
     
     this.admobFree.banner.prepare()
       .then(() => {

       })
       .catch(e => console.log(e));
     
    
  }

  ionViewWillEnter() {
    console.log("will enter");
    this.loadMap();
  }
  //   var geojsonFeature = {
  //     "type": "Feature",
  //     "properties": {
  //        "name": "Location B",
  //        "category": "House"
  //     },
  //     "geometry": {
  //         "type": "Point",
  //         "coordinates": [-104.99404, 39.75621]
  //     }
  // };

  async loadMap() {
    this.map = new Map("mapId3").setView([17.385, 78.4867], 3);
    await this.httpService.getCountries().subscribe((d: Array<any>) => {
      console.log("ddd ", d);
      this.countries = d.filter(el => {
        return el.Country != "";
      });
      this.countries.forEach(el => {
        if (el.Country == " USA ") {
          el.Country = " United States of America ";
        }
        if (el.Country == " Palestine ") {
          el.Country = " West Bank ";
        }
        
        el.Country = el.Country;
        el.Total_Cases = el.Total_Cases.replace(/\s|,|\+/g, "");
        el.New_Cases = el.New_Cases.replace(/\s|,|\+/g, "");
        el.Total_Deaths = el.Total_Deaths.replace(/\s|,|\+/g, "");
        el.New_Deaths = el.New_Deaths.replace(/\s|,|\+/g, "");
        el.Total_Recovered = el.Total_Recovered.replace(/\s|,|\+/g, "");
        el.Active_Cases = el.Active_Cases.replace(/\s|,|\+/g, "");
        el.Critical = el.Critical.replace(/\s|,|\+/g, "");
      });
      this.countries.map(el => {
        return (
          el.Total_Cases != ""
            ? (el.Total_Cases = parseInt(el.Total_Cases))
            : (el.Total_Cases = 0),
          el.New_Cases != ""
            ? (el.New_Cases = parseInt(el.New_Cases))
            : (el.New_Cases = 0),
          el.Total_Deaths != ""
            ? (el.Total_Deaths = parseInt(el.Total_Deaths))
            : (el.Total_Deaths = 0),
          el.New_Deaths != ""
            ? (el.New_Deaths = parseInt(el.New_Deaths))
            : (el.New_Deaths = 0),
          el.Total_Recovered != ""
            ? (el.Total_Recovered = parseInt(el.Total_Recovered))
            : (el.Total_Recovered = 0),
          el.Active_Cases != ""
            ? (el.Active_Cases = parseInt(el.Active_Cases))
            : (el.Active_Cases = 0),
          (el.Critical = parseInt(el.Critical))
        );
      });
      setTimeout(() => {
      }, 3000);

      this.jsn.features.forEach(element => {
        let currCountry = this.countries.find(w => {
          return w.Country === " " + element.properties.ADMIN + " ";
        });
        // console.log("element ", element)
        if (currCountry != undefined) {
          element.properties.Total_Cases = currCountry.Total_Cases;
          element.properties.New_Cases = currCountry.New_Cases;
          element.properties.Total_Deaths = currCountry.Total_Deaths;
          element.properties.New_Deaths = currCountry.New_Deaths;
          element.properties.Active_Cases = currCountry.Active_Cases;
          element.properties.Total_Recovered = currCountry.Total_Recovered;
          element.properties.Critical = currCountry.Critical;
        }
        // console.log(currCountry)
      });
      this.jsn.features.filter(e => {
        return e.properties.Total_Cases != undefined;
      });

      console.log("after map ", this.jsn);
      L.geoJSON(this.jsn, {
        style: function(feature) {
          if (feature.properties.Total_Cases > 1000) {
            return { color: "#FF0000", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 900 &&
            feature.properties.Total_Cases < 1000
          ) {
            return { color: "#FF2300", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 800 &&
            feature.properties.Total_Cases < 900
          ) {
            return { color: "#FF3400", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 700 &&
            feature.properties.Total_Cases < 800
          ) {
            return { color: "#FF4600", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 600 &&
            feature.properties.Total_Cases < 700
          ) {
            return { color: "#FF6900", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 500 &&
            feature.properties.Total_Cases < 600
          ) {
            return { color: "#FF7B00", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 400 &&
            feature.properties.Total_Cases < 300
          ) {
            return { color: "#FF9E00", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 300 &&
            feature.properties.Total_Cases < 400
          ) {
            return { color: "#FFAF00", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 200 &&
            feature.properties.Total_Cases < 300
          ) {
            return { color: "#FFC100", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 100 &&
            feature.properties.Total_Cases < 200
          ) {
            return { color: "#FFD300", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 0 &&
            feature.properties.Total_Cases < 100
          ) {
            return { color: "#8DFF00", weight: 0 };
          } else if (
            feature.properties.Total_Cases > 0 &&
            feature.properties.Total_Cases < 10
          ) {
            return { color: "green", weight: 0 };
          } else {
            return { color: "white", weight: 0 };
          }
        },
        onEachFeature: (f, l) => {
          if (f.properties.Total_Cases != undefined) {
            l.bindPopup(
              `<pre style="text-align:center; font-size:18px"><b>${f.properties.ADMIN}<b> </pre>
              <table>
                  <tr>
                      <td>Total Cases</td>
                      <td>${f.properties.Total_Cases}</td>
                  </tr>
                  <tr>
                      <td>New Cases</td>
                      <td>${f.properties.New_Cases}</td>
                  </tr>
                  <tr>
                      <td>New Deaths</td>
                      <td>${f.properties.New_Deaths}</td>
                  </tr>
                  <tr>
                      <td>Total Recovered</td>
                      <td>${f.properties.Total_Recovered}</td>
                  </tr>
                  <tr>
                      <td>Active Cases</td>
                      <td>${f.properties.Active_Cases}</td>
                  </tr>
                  <tr style="color:red">
                      <td>Total Deaths</td>
                      <td>${f.properties.Total_Deaths}</td>
                  </tr>
              </table>`
            );
          }
        }
      }).addTo(this.map);
      // console.log(this.jsn);
    });

    await this.http.get(".././../assets/countries.geojson").subscribe(s => {
      this.jsn = s;
    });
    // console.log(json);
    var myStyle = {
      color: "red",
      weight: 1,
      opacity: 0.65
    };

    var greenIcon = L.icon({
      iconUrl: "  .././../assets/cr.webp",
      shadowUrl: "leaf-shadow.png",
      iconSize: [50, 50], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.tileLayer(
      "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      {}
    ).addTo(this.map);
  }
  style(feature) {
    // console.log(feature.properties.Total_Cases != undefined)
    if (feature.properties.Total_Cases != undefined) {
      console.log(feature.properties.Total_Cases);
      return {
        fillColor: this.getColor(feature.properties.Total_Cases),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7
      };
    }
  }
  getColor(d) {
    return d > 1000
      ? "#800026"
      : d > 500
      ? "#BD0026"
      : d > 200
      ? "#E31A1C"
      : d > 100
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 20
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  }
}
