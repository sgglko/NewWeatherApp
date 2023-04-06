import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, ɵValue} from "@angular/forms";
import {DataService} from "../data.service";
import {APICallService} from "../apicall.service";
import {OutputComponent} from "../output/output.component";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  containerUnits: any;

  containerUnitsVisible: boolean = false;
  containerLanguage: any;

  containerLanguageVisible: boolean = false;
  ngOnInit(): void {
    this.containerUnits = document.querySelector(
      ".containerUnits"
    ) as HTMLElement;
    this.containerLanguage = document.querySelector(
      ".containerLanguage"
    ) as HTMLElement;
    this.metric = document.querySelector(
      ".unitsButtonMetric"
    ) as HTMLElement;
    this.imperial = document.querySelector(
      ".unitsButtonImperial"
    ) as HTMLElement;
    this.default = document.querySelector(
      ".unitsButtonDefault"
    ) as HTMLElement;



    this.setDefault();
  }
  constructor(
    private dataService: DataService,
    private apiService: APICallService,

    private output: OutputComponent
  )
  { }

// Set the Units for the Api Call
  chooseUnits() {
    if (!this.containerUnitsVisible) {
      this.containerLanguage.style.display = "none";
      this.containerUnits.style.display = "block";
      this.containerUnitsVisible = true;
      this.containerLanguageVisible = false;
    }else {
      this.containerUnits.style.display = "none";
      this.containerUnitsVisible = false;
    }
  }

  chooseLanguages() {
    if (!this.containerLanguageVisible) {
      this.containerUnits.style.display = "none";
      this.containerLanguage.style.display = "block";
      this.containerLanguageVisible = true;
      this.containerUnitsVisible = false;
    }else {
      this.containerLanguage.style.display = "none";
      this.containerLanguageVisible = false;
    }
  }


  //Get the CityName from the QuickSearch
  cityName: ɵValue<FormControl<string | null>> | undefined = "";
  inputFormDefault = new FormGroup({
    cityName: new FormControl(this.cityName, [
      Validators.required,
      Validators.pattern('^[a-zA-ZÄÜÖäüö ]*$')
    ])
  })

  onSubmit() {
    this.cityName = this.inputFormDefault.value.cityName;
    this.dataService.setData("cityName", this.cityName);
    this.apiService.apiCall();
    this.LocationFormGroup.reset();
    this.inputFormDefault.reset();
    this.CoordinatesFormGroup.reset();

  }

//set the Units for the Api Call
 units: string = "";
 metric: any;
 imperial: any;
 default: any;
  setMetric() {
    this.units = "&units=metric";
    this.dataService.setData("units", this.units);
    this.metric.style.color = "red";
    this.imperial.style.color = "black";
    this.default.style.color = "black";

  }
  setImperial() {
    this.units = "&units=imperial";
    this.dataService.setData("units", this.units);
    this.metric.style.color = "black";
    this.imperial.style.color = "red";
    this.default.style.color = "black";
  }
  setDefault() {
    this.units = "";
    this.dataService.setData("units", this.units);
    this.metric.style.color = "black";
    this.imperial.style.color = "black";
    this.default.style.color = "red";
  }

  //Custom Search
  countryCode: ɵValue<FormControl<string | null>> | undefined = "";
  cityNameCustomSearch: ɵValue<FormControl<string | null>> | undefined = "";
  cityID: ɵValue<FormControl<string | null>> | undefined = "";
  stateCode: ɵValue<FormControl<string | null>> | undefined = "";
  ZIPCode: ɵValue<FormControl<string | null>> | undefined = "";
  latitude: ɵValue<FormControl<string | null>> | undefined = "";
  longitude: ɵValue<FormControl<string | null>> | undefined = "";

  CoordinatesFormGroup = new FormGroup({
    latitude: new FormControl(this.latitude, [
      Validators.required,
      Validators.pattern('^^-?\\d*\\.?\\d+$')
    ]),
    longitude: new FormControl(this.longitude, [
      Validators.required,
      Validators.pattern('^-?\\d*\\.?\\d+$')
    ])
  })

  LocationFormGroup = new FormGroup({
    cityName: new FormControl(this.cityNameCustomSearch, [
      Validators.pattern('^[a-zA-Z]*$')
    ]),
    countryCode: new FormControl(this.countryCode, [
      Validators.maxLength(2),
      Validators.pattern(/^[A-Za-z]{2}$/)
    ]),
    stateCode: new FormControl(this.stateCode, [
      Validators.maxLength(6),
    ]),
    cityID: new FormControl(this.cityID, [
      Validators.pattern(/^[1-9][0-9]*$/),
      Validators.max(2147483647),
    ]),
    ZIPCode: new FormControl(this.ZIPCode, [
      Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)
    ])
  })

  switch = new FormControl(
    false
  );
  switchLocation: any;
  switchCoords: any;

  switchInput() {
    this.switch.setValue(true)
  }

  switchSubmit() {
    this.switchLocation = document.querySelector(
      ".location"
    ) as HTMLElement;
    this.switchCoords = document.querySelector(
      ".coordinates"
    ) as HTMLElement;
    if (this.switch.value == false) {
      this.switchCoords.style.textDecoration = "underline";
      this.switchLocation.style.textDecoration = "none";
      this.switchCoords.style.opacity = 1;
      this.switchLocation.style.opacity = 0.3;
    } else {
      this.switchCoords.style.textDecoration = "none";
      this.switchLocation.style.textDecoration = "underline";
      this.switchCoords.style.opacity = 0.3;
      this.switchLocation.style.opacity = 1;
    }
  }

  customSearch: boolean = false;

  showCustomSearch() {
    this.customSearch ?  this.customSearch = false : this.customSearch = true;
  }

  //submit Data to Service
  submitLocationData() {
    this.dataService.setData("cityName", this.LocationFormGroup.value.cityName);
    this.dataService.setData("countryCode", this.LocationFormGroup.value.countryCode);
    this.dataService.setData("stateCode", this.LocationFormGroup.value.stateCode);
    this.dataService.setData("cityID", this.LocationFormGroup.value.cityID);
    this.dataService.setData("ZIPCode", this.LocationFormGroup.value.ZIPCode);
    this.apiService.apiCall()
    this.LocationFormGroup.reset();
    this.CoordinatesFormGroup.reset();
  }

  submitCoordinatesData() {
    this.dataService.setData("latitude", this.CoordinatesFormGroup.value.latitude);
    this.dataService.setData("longitude", this.CoordinatesFormGroup.value.longitude);
    this.apiService.apiCall()
    this.LocationFormGroup.reset();
    this.CoordinatesFormGroup.reset();
  }





}
