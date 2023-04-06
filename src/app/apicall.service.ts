import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import { EventService } from './event.service';
import {HttpService} from "./http.service";
import {OutputComponent} from "./output/output.component";

@Injectable({
  providedIn: 'root'
})
export class APICallService {
  private apiKey: string = "&appid=8ef5cb0f4c7d95e295f21af94d6d3698";
  private apiUrl: string = "https://api.openweathermap.org/data/2.5/weather?"
  private units?: string;
  private latitude?: string;
  private longitude?: string;
  private cityName?: string;
  private countryCode?: string;
  private stateCode?: string;
  private cityID?: string;
  private ZIPCode?: string;
  private finalAPI?: string;
  public APIData: any;
  constructor(
    private dataService: DataService,
    private http: HttpService,
    private eventService: EventService
  ) { }

  APIBuilder() {

   this.units = this.dataService.getData("units");
   this.latitude = this.dataService.getData("latitude");
   this.longitude = this.dataService.getData("longitude");
   this.cityName = this.dataService.getData("cityName");
   this.countryCode = this.dataService.getData("countryCode");
   this.stateCode = this.dataService.getData("stateCode");
   this.cityID = this.dataService.getData("cityID");
   this.ZIPCode = this.dataService.getData("ZIPCode");

    console.log(this.cityName);
    if (this.latitude !== "" && this.longitude !== "") {
      this.finalAPI = this.apiUrl + "lat=" + this.latitude + "&lon=" + this.longitude + this.apiKey + this.units;
    }else if (this.cityName!== "" && this.countryCode!== "" && this.stateCode!== "") {
      this.finalAPI = this.apiUrl + "q=" + this.cityName + "," + this.countryCode + "," + this.stateCode + this.apiKey + this.units;
    }else if (this.cityName!== "" && this.countryCode!== "") {
      this.finalAPI = this.apiUrl + "q=" + this.cityName + "," + this.countryCode + this.apiKey + this.units;
    }else if (this.cityName!== "") {
      this.finalAPI = this.apiUrl + "q=" + this.cityName + this.apiKey + this.units;
    }else if (this.ZIPCode !== "" && this.countryCode !== "") {
      this.finalAPI = this.apiUrl + "zip=" + this.ZIPCode + "," + this.countryCode + this.apiKey + this.units;
    }else if (this.cityID !== "") {
      this.finalAPI = this.apiUrl + "id=" + this.cityID + this.apiKey + this.units;
    }else {
      console.log("No API key provided");
    }
    console.log(this.finalAPI);
  }

  apiCall() {
    this.APIBuilder();
    this.http.getRequest(this.finalAPI!).subscribe(
      (data) => {
        this.eventService.updateData(data);
      },
      (error) => {
        console.log("Error occurred: ", error);
      },
      () => {
        console.log("Observable completed");
      }
    );
  }
}
