import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map.component';
import {PopupDatatransferService} from "./services/popup-datatransfer.service";
import {PopupModal} from "./components/popup-modal/popup-modal.component"

import {LeafletService} from "./services/leaflet.service";


@NgModule({
  declarations: [
    LeafletMapComponent,
    PopupModal
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LeafletMapComponent
  ],
  providers: [
    LeafletService,
    PopupDatatransferService
  ]
})
export class LeafletMapModule { }
