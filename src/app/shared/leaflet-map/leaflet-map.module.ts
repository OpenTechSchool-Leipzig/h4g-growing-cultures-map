import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map.component';
import {LeafletService} from "./services/leaflet.service";


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
    LeafletService,
  ]
})
export class LeafletMapModule { }
