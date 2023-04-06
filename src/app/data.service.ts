import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = {
    "cityName":"",
    "cityID":"",
    "countryCode":"",
    "stateCode":"",
    "ZIPCode":"",
    "latitude":"",
    "longitude":"",
    "units":"",
  };

  constructor() {
  }

  setData(key: string, value: any) {
    this.data[key] = value;
  }

  getData(key: string): any {
    return this.data[key];
  }
}
