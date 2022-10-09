import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {LeafletMapModule} from "../../shared/leaflet-map/leaflet-map.module";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  }
]

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule.forChild(routes),
    LeafletMapModule
  ]
})
export class MainPageModule {
}
