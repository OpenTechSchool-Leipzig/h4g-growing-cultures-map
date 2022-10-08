import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GmapComponent} from './components/gmap/gmap.component';
import {AgmCoreModule} from "@agm/core";


@NgModule({
  declarations: [
    GmapComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule
  ],
  exports: [
    GmapComponent
  ]
})
export class GmapModule {
}
