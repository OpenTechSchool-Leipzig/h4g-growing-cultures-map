import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PointOfInterest} from "../interfaces/poi.interface";

@Injectable()
export class LeafletService {

  constructor(private httpClient: HttpClient) {
  }

  fetchData(): Observable<{
    id: string;
    name: string;
    pois: PointOfInterest[];
  }> {
    return this.httpClient.get<{
      id: string;
      name: string;
      pois: PointOfInterest[];
    }>('https://growcult.uber.space/api/examples/tour-website.json');
  }
}
