import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './components/main-page/main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {LeafletMapModule} from "../../shared/leaflet-map/leaflet-map.module";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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
    LeafletMapModule
  ]
})
export class MainPageModule {
}
