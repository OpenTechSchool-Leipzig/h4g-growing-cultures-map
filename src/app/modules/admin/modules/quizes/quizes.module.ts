import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserComponent } from './components/browser/browser.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatStepperModule} from "@angular/material/stepper";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";


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
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatStepperModule,
    DragDropModule,
    MatSnackBarModule,
    MatIconModule
  ]
})
export class QuizesModule { }
