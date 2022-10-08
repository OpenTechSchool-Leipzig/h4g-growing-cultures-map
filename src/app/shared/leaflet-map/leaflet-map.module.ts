import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map.component';
import {PopupDatatransferService} from "./services/popup-datatransfer.service";



@NgModule({
  declarations: [
    LeafletMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LeafletMapComponent
  ],
  providers: [
    PopupDatatransferService
  ]
})
export class LeafletMapModule { }
