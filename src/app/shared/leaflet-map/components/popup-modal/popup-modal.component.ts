import {PointOfInterest} from "../../interfaces/poi.interface";
import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModal {

  poi: PointOfInterest = {
    id: '',
    name: '',
    images: [],
    location: {lat: 0, lon: 0},
    info_nodes: []
  };

  constructor(public dialogRef: MatDialogRef<PopupModal>,
              @Inject(MAT_DIALOG_DATA) public data: { poi: PointOfInterest }) {
  }

  ngOnInit() {
    this.poi = this.data.poi;
    console.log(this.poi)
  }
}
