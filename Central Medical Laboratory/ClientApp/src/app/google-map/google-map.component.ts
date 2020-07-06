import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  @ViewChild('googleMap', {static: false}) mapElement: any;

  map: google.maps.Map;
  marker: google.maps.Marker;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const mapProperties = {
      center: new google.maps.LatLng(33.773864, -118.009155),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(33.773864, -118.009155),
      map: this.map,
      title: 'PathLab Services',
    });  
  }

}
