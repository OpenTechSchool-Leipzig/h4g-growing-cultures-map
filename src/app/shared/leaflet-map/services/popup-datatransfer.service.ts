import {Injectable} from '@angular/core';
import {PointOfInterest} from "../interfaces/poi.interface";

@Injectable()
export class PopupDatatransferService {

  public popupData?: PointOfInterest;

  constructor() {
  }

  updatePopupData(value: PointOfInterest): void {
    if (!this.popupData) {
      return;
    }

    this.popupData = value;
    // this.popupData.next(value);
  }
}
