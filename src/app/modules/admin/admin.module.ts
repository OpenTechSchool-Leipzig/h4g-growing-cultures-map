import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminPanelComponent
  },
  {
    path: 'quizes',
    loadChildren: () => import('./modules/quizes/quizes.module')
      .then(m => m.QuizesModule)
  }
]

@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatButtonToggleModule,
    MatCardModule,
  ]
})
export class AdminModule { }
