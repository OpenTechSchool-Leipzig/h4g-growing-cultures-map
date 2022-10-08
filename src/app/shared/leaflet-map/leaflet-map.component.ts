import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {icon} from 'leaflet';
import {MockTrees} from "./mock/mock-trees";
import {MockParkPolygonPoints} from "./mock/mock-park-polygon";
import {iconRetinaUrl, iconUrl, shadowUrl} from "./mock/mock-icon-settings";

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {

  private map: L.Map | undefined;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const polygon = L.polygon(MockParkPolygonPoints, {color: 'green'}).addTo(this.map);
    this.map.fitBounds(polygon.getBounds());
    this.addMarkers(this.map);
  }

  constructor() {
  }

  private addMarkers(map: L.Map): void {
    MockTrees.map<void>(jsonItem => {
      let marker = L.marker([jsonItem.lat, jsonItem.lng]).addTo(map);

      marker.setIcon(icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      }))

      marker.bindPopup(jsonItem.name).openPopup();
    })
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
