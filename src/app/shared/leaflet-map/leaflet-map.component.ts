import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {icon} from 'leaflet';
import {MockParkPolygonPoints} from "./mock/mock-park-polygon";
import {LeafletService} from "./services/leaflet.service";
import {PointOfInterest} from "./interfaces/poi.interface";
import {MatDialog} from '@angular/material/dialog';

import {iconRetinaUrl, iconUrl, shadowUrl, userIcon} from "./mock/mock-icon-settings";
import {PopupDatatransferService} from "./services/popup-datatransfer.service";
import {PopupModal} from './components/popup-modal/popup-modal.component';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, AfterViewInit {

  private map: L.Map | undefined;
  private _userMarker: L.Marker = new L.Marker([0, 0], {icon: userIcon});


  mainData?: {
    id: string;
    name: string;
    pois: PointOfInterest[];
  };

  openedPopup?: PointOfInterest = undefined;

  constructor(private leafletService: LeafletService,
              public popupDataTransferService: PopupDatatransferService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.leafletService.fetchData()
      .subscribe((res) => {
        this.mainData = res;
        this.initMap();
        this.map!.closePopup();
      })
  }

  ngAfterViewInit(): void {

  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    this.initTiles();

    this.initPolygons();

    this.initMarkers(this.map);

    this.map.on('popupopen', (event) => {
      const latLng = event.popup.getLatLng();
      if (!latLng || !this.mainData) {
        return;
      }

      const openedPopup = this.mainData.pois.filter((poi) =>
        poi.location.lat == latLng.lat && poi.location.lon == latLng.lng
      )[0];
      this.openedPopup = openedPopup;
      event.popup.setContent(this.getMarketHtml(openedPopup));
      if (!document.getElementById(`show-more-btn-${openedPopup.id}`)) {
        return;
      }
      document.getElementById(`show-more-btn-${openedPopup.id}`)!.addEventListener('click', () => {
        this.openModalFromPopup(openedPopup);
      });
    });

  }

  private initMarkers(map: L.Map): void {
    if (!this.mainData) {
      return;
    }

    var routePath: [number, number][] = [];

    this.mainData.pois.forEach((poi) => {
      let marker = L.marker([poi.location.lat, poi.location.lon]).addTo(map);

      routePath.push([poi.location.lat, poi.location.lon]);

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

      const popupHtml = this.getMarketHtml(poi);
      if (document.getElementById(`show-more-btn-${poi.id}`)) {
        document.getElementById(`show-more-btn-${poi.id}`)!.addEventListener('click', () => {
          this.openModalFromPopup(poi);
        })
      }

      marker.bindPopup(
        L.popup()
          .setContent(popupHtml)
      ).openPopup();
    })
    L.polyline(routePath, {color: '#59CC2B'}).addTo(map);
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
    this.watchUserPosition(this.map, polygon);
  }

  private getMarketHtml(poi: PointOfInterest): string {
    return `
        <div class="popup-container">
          <div class="title-wrapper">
            <h1>${poi.name}</h1>
          </div>
          <div class="description-wrapper">
            <h3>${poi.location.lat}, ${poi.location.lon}</h3>
          </div>

          <div class="show-more-button-wrapper">
            <button class="show-more"
                    id="show-more-btn-${poi.id}"
                    (click)="openModalFromPopup(openedPopup)"
            >
              Mehr
            </button>
          </div>
        </div>
      `;
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
      this._userMarker.setIcon(userIcon)
      this._userMarker.addTo(map);

    }, (_) => {
    }, options);
  }

  openModalFromPopup(poi: PointOfInterest) {
    this.map!.closePopup();
    this.dialog.open(PopupModal, {
      data: {
        poi,
      },
    });
  }

}
