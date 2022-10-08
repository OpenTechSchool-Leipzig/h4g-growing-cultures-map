import { Component, OnInit } from '@angular/core';
import {QuizListItem} from "../../../../../shared/interfaces/quiz-list-item.interface";
import {QuizService} from "../../../../../shared/services/quiz.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  quizes$: Observable<QuizListItem[]>| undefined;
  constructor(
    private _quizService: QuizService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.quizes$ = this._quizService.list();
  }

  onEditClick(id: string) {
    this._router.navigate(['admin', 'quizes', 'edit', id])
      .then(value => console.log(value));
  }

  onViewClick(id: string) {
    this._router.navigate(['admin', 'quizes', 'view', id])
      .then(value => console.log(value));
  }

  onCreateNewClick() {
    this._router.navigate(['admin', 'quizes', 'create'])
      .then(value => console.log(value));
  }
}
