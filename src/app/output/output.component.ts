import {Component, Injectable, OnInit} from '@angular/core';
import { APICallService } from '../apicall.service';
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
  ) {}

  public cityNameOutput?: string = "";
  public countryOutput?: string = "";
  public longitudeOutput?: string = "";
  public latitudeOutput?: string = "";
  public tempOutput?: string = "";
  public windSpeedOutput?: string = "";
  public humidityOutput?: string = "";
  public pressureOutput?: string = "";
  public weatherOutput?: string = "";
  public weatherDescriptionOutput?: string = "";
  public search: boolean = false;

  ngOnInit(): void {
    this.eventService.onDataUpdated$.subscribe(data => {
      this.cityNameOutput = data.name;
      this.countryOutput = data.sys.country;
      this.longitudeOutput = data.coord.lon;
      this.latitudeOutput = data.coord.lat;
      this.tempOutput = data.main.temp;
      this.windSpeedOutput = data.wind.speed;
      this.humidityOutput = data.main.humidity;
      this.pressureOutput = data.main.pressure;
      this.weatherOutput = data.weather[0].main;
      this.weatherDescriptionOutput = data.weather[0].description;
      this.search = true;
    });
  }







}
