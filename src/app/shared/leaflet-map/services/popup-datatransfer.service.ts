import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

export interface IPopupBrief {
  id: string;
  title: string;
  description: string;
}

export interface IPopup extends IPopupBrief{

}

@Injectable()
export class PopupDatatransferService {

  public popupData: Subject<IPopup> | undefined;

  constructor() {
  }

  updatePopupData(value: IPopup): void {
    if (!this.popupData) {
      return;
    }

    this.popupData.next(value);
  }
}
