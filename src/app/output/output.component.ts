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

  public cityNameOutput?: string = "London";
  public countryOutput?: string = "UK";
  public longitudeOutput?: string = "12.345";
  public latitudeOutput?: string = "67.890";
  public tempOutput?: string = "20.5";
  public windSpeedOutput?: string = "13.3";
  public humidityOutput?: string = "50";
  public pressureOutput?: string = "1020";
  public weatherOutput?: string = "Sun";
  public weatherDescriptionOutput?: string = "Supernova Sun";
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
