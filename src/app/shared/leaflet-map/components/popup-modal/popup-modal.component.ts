import { Input } from '@angular/core';
import {PointOfInterest} from "../../interfaces/poi.interface";
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'popup-modal',
    templateUrl: './popup-modal.component.html',
    styleUrls: ['./popup-modal.component.scss']
})
export class PopupModal {


    constructor( public dialogRef: MatDialogRef<PopupModal>,
        @Inject(MAT_DIALOG_DATA) public data: {poi: PointOfInterest}) {
        console.log('myCustomComponent');
    }

    ngOnInit() {
        console.log(this.data.poi);
    }
}
