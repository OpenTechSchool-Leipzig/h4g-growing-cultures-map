import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {icon} from 'leaflet';
import {MockTrees} from "./mock/mock-trees";
import {MockParkPolygonPoints} from "./mock/mock-park-polygon";
import {Observable} from "rxjs";
import {LeafletService} from "./services/leaflet.service";
import {PointOfInterest} from "./interfaces/poi.interface";

import {iconRetinaUrl, iconUrl, shadowUrl, userIcon} from "./mock/mock-icon-settings";
import {PopupDatatransferService} from "./services/popup-datatransfer.service";

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, AfterViewInit {

  private map: L.Map | undefined;
  private _userMarker: L.Marker = new L.Marker([0, 0], {icon: userIcon});

  pois$?: Observable<{
    id: string;
    name: string;
    pois: PointOfInterest[];
  }>;

  @ViewChild('pointPopup')
  pointPopupRef?: ElementRef<HTMLDivElement>;

  constructor(private leafletService: LeafletService,
              public popupDataTransferService: PopupDatatransferService) {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    this.initTiles();

    //this.initPolygons();
    const polygon = L.polygon(MockParkPolygonPoints, {color: 'green'}).addTo(this.map);
    this.map.fitBounds(polygon.getBounds());
    this.initMarkers(this.map);
    this.watchUserPosition(this.map, polygon);

  }

// TODO: Remove Mock data from usage.
  private initMarkers(map: L.Map): void {
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

      const popupHtml = this.pointPopupRef?.nativeElement.innerHTML ?? '';
      marker.bindPopup(
        L.popup()
          .setContent(popupHtml)
      ).openPopup();
    })
  }

  watchUserPosition(map: L.Map, _: L.Polygon<any>): void {
    let options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.watchPosition((pos) => {
      this._userMarker.remove;
      this._userMarker.setLatLng([pos.coords.latitude, pos.coords.longitude]);
      this._userMarker.setIcon(icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      }))
      this._userMarker.addTo(map);

    }, (_) => {
    }, options);
  }

  ngOnInit() {
    this.pois$ = this.leafletService.fetchData();
    this.pois$.subscribe((res) => {
      console.log(res)
    })
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initTiles(): void {
    if (!this.map) {
      return;
    }

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  private initPolygons(): void {
    if (!this.map) {
      return;
    }

    const polygon = L.polygon(MockParkPolygonPoints, {color: 'green'}).addTo(this.map);
    this.map.fitBounds(polygon.getBounds());
  }

  openModalFromPopup(id: string) {

  }
}
