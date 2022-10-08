import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuizService} from "./services/quiz.service";

@NgModule({
  declarations: [],
  providers: [
    QuizService
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
