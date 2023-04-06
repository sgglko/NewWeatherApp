import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {LeafletMouseEvent} from "leaflet";
import { DataService } from '../data.service';
import {APICallService} from "../apicall.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: any;
  @Input() clickLat: number | undefined;
  @Input() clickLng: number | undefined;
  public mapClick: EventEmitter<LeafletMouseEvent> = new EventEmitter();


  constructor(
    private dataService: DataService,
    private apiCall: APICallService
  ) {
  }
  ngOnInit() {
    this.map= L.map('map', {
      boxZoom: false,
      doubleClickZoom: false,
      dragging: true,
      keyboard: false,
      scrollWheelZoom: true,
      touchZoom: true,
      minZoom: 2
    })

    this.map.on('click', (e: LeafletMouseEvent) => {
      this.dataService.setData("latitude", e.latlng.lat);
      this.dataService.setData("longitude", e.latlng.lng);
      this.apiCall.apiCall();
    })

    this.map.setView([0, 0], 2);

    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {

      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

  }



}
