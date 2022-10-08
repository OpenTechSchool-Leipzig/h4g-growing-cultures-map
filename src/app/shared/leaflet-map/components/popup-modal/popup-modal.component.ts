import { Component, Input } from '@angular/core';
import {PointOfInterest} from "../../interfaces/poi.interface";

@Component({
    selector: 'popup-modal',
    templateUrl: './popup-modal.component.html',
    styleUrls: ['./popup-modal.component.scss']
})
export class PopupModal {

    @Input()
    poi?: PointOfInterest;

    constructor() {
        console.log('myCustomComponent');
    }

    ngOnInit() {
        console.log(this.poi);
    }
}
