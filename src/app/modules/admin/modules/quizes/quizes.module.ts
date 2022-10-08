import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserComponent } from './components/browser/browser.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BrowserComponent
  },
  {
    path: 'edit/:id',
    component: EditQuizComponent
  },
  {
    path: 'view/:id',
    component: ViewQuizComponent
  },
  {
    path: 'create',
    component: CreateQuizComponent
  }
]

@NgModule({
  declarations: [
    BrowserComponent,
    EditQuizComponent,
    ViewQuizComponent,
    CreateQuizComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class QuizesModule { }
