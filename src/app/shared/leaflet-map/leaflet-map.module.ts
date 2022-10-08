import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map.component';



@NgModule({
  declarations: [
    LeafletMapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LeafletMapComponent
  ]
})
export class LeafletMapModule { }
