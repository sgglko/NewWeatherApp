import { Injectable } from '@angular/core';
import { DataService } from "./data.service";
import { HttpService } from "./http.service";
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class APICallService {
  private apiKey = "&appid=8ef5cb0f4c7d95e295f21af94d6d3698";
  private apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  private finalAPI: string | undefined;

  constructor(
    private dataService: DataService,
    private http: HttpService,
    private eventService: EventService
  ) { }

  private buildAPI() {
    const dataKeys = ["units", "latitude", "longitude", "cityName", "countryCode", "stateCode", "cityID", "ZIPCode"];
    const data: any = {};
    dataKeys.forEach(key => data[key] = this.dataService.getData(key));

    let parts = '';
    if (data.latitude && data.longitude) {
      parts = `lat=${data.latitude}&lon=${data.longitude}`;
    } else if (data.cityName && data.countryCode) {
      parts = `q=${data.cityName},${data.countryCode}`;
      if (data.stateCode) parts += `,${data.stateCode}`;
    } else if (data.cityName) {
      parts = `q=${data.cityName}`;
    } else if (data.ZIPCode && data.countryCode) {
      parts = `zip=${data.ZIPCode},${data.countryCode}`;
    } else if (data.cityID) {
      parts = `id=${data.cityID}`;
    } else {
      console.log("No API key provided");
      return;
    }

    this.finalAPI = `${this.apiUrl}${parts}${this.apiKey}${data.units || ''}`;
    console.log(this.finalAPI);
  }

  public apiCall() {
    this.buildAPI();
    if (!this.finalAPI) return;

    this.http.getRequest(this.finalAPI).subscribe(
      (data) => this.eventService.updateData(data),
      (error) => console.log("Error occurred: ", error),
      () => console.log("Observable completed")
    );
  }
}
