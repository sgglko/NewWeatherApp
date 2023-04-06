import {Component, Injectable, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { EventService } from '../event.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private dataService: DataService
  ) {}
  data: any;
  public search: boolean = false;
  units: any = {};

  unitsSetting: string = "";
  ngOnInit(): void {
    this.eventService.onDataUpdated$.subscribe(data => {
      this.data = data;
      this.search = true;
      this.unitsSetting = this.dataService.getData("units")
      if (this.unitsSetting === "&units=metric") {
        this.units = this.metric;
      } else if (this.unitsSetting === "&units=imperial") {
        this.units = this.imperial;
      } else {
        this.units = this.default;
      }
    });
  }

  //different Units

  metric: any = {
    temp: '°C',
    windSpeed: 'm/s',
    pressure: 'hPa',
  };
  imperial: any = {
    temp: '°F',
    windSpeed: 'mph',
    pressure: 'hPa',
  };
  default: any = {
    temp: 'K',
    windSpeed: 'm/s',
    pressure: 'hPa',
  }







}
