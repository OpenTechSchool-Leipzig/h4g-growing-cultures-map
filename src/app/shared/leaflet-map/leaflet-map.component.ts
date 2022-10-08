import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';

export interface IMarker {
  lat: number,
  lng: number,
  title: string
}

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {

  private map: L.Map | undefined;

  private _markers: IMarker[] = [];

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

  var latlngs = [
    [51.334451776734284, 12.359309410534523],[51.336550284004254, 12.36320823209338],[51.33586972039641, 12.364153021879284],[51.33603412436178, 12.364486345715854],[51.33573122204908, 12.36492492976807], [51.33565151058252, 12.365092389111803], [51.33561676425567, 12.366397072651797],[51.33551182153987, 12.366691858822552],[51.33497860323273, 12.367841203288094], [51.334902767236414, 12.367879135448673],[51.334824561233845, 12.36784878972021],[51.33477953347487, 12.367746372886646], [51.334509365981596, 12.366297364304778], [51.334175209252415, 12.36402902101589], [51.333923997632, 12.363308309964891], [51.33379128150069, 12.363101579671719],[51.3336324956254, 12.362881573114638], [51.33343697494862, 12.362665359784245], [51.33322723365886, 12.362500354866164],[51.33273901858108, 12.362305004220392], [51.33267739883366, 12.361781540404403], [51.334447728107655, 12.359300575501237]]
  ;

  var polygon = L.polygon(latlngs as [number, number][], {color: 'green'}).addTo(this.map);
  this.map.fitBounds(polygon.getBounds());
   this.addMarkers(this.map);
  }
  addMarkers ( map: L.Map ): void
  {

    const json = [
      {
        "id": "G4113",
        "lat": 51.335,
        "lng": 12.3668,
        "url": "https://s-leipzig.maps.arcgis.com/apps/webappviewer/index.html?id=d53ee05f33ae44c5ab41bd458d11e593&marker=12.366827860070135%2C51.33503168782829%2C%2C%2C%2C&markertemplate=%7B%22title%22%3A%22G4113%22%2C%22longitude%22%3A12.366827860070135%2C%22latitude%22%3A51.33503168782829%2C%22isIncludeShareUrl%22%3Atrue%7D&level=8",
        "name": "Pyramiden-Pappel",
        "lat_name": "Populus nigra 'Italica'",
        "date": 1950
      },
      {
        "id": "G3943",
        "lat": 51.3351,
        "lng": 12.3659,
        "url": "https://s-leipzig.maps.arcgis.com/apps/webappviewer/index.html?id=d53ee05f33ae44c5ab41bd458d11e593&marker=12.365885636684226%2C51.33514009402672%2C%2C%2C%2C&markertemplate=%7B%22title%22%3A%22G3943%22%2C%22longitude%22%3A12.365885636684226%2C%22latitude%22%3A51.33514009402672%2C%22isIncludeShareUrl%22%3Atrue%7D&level=8",
        "name": "Hänge-Silber-Linde",
        "lat_name": "Tilia tomentosa 'Petiolaris'",
        "date": 1900
      },
      {
        "id": "G3952",
        "lat": 51.3352,
        "lng": 12.3658,
        "url": "https://s-leipzig.maps.arcgis.com/apps/webappviewer/index.html?id=d53ee05f33ae44c5ab41bd458d11e593&marker=12.365767551311416%2C51.335208759713446%2C%2C%2C%2C&markertemplate=%7B%22title%22%3A%22G3952%22%2C%22longitude%22%3A12.365767551311416%2C%22latitude%22%3A51.335208759713446%2C%22isIncludeShareUrl%22%3Atrue%7D&level=8",
        "name": "Hänge-Esche",
        "lat_name": "Fraxinus excelsior 'Pendula'",
        "date": 1920
      }
    ];

    json.map<void>(jsonItem => {
      let marker =L.marker([jsonItem.lat, jsonItem.lng]).addTo(map);
      marker.bindPopup(jsonItem.name).openPopup();
    })
  }


  constructor() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }


  
}
