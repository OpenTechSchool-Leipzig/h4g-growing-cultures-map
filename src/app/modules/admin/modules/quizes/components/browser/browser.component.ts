import { Component, OnInit } from '@angular/core';
import {QuizListItem} from "../../../../../shared/interfaces/quiz-list-item.interface";
import {QuizService} from "../../../../../shared/services/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  quizes: QuizListItem[] = [];
  constructor(
    private _quizService: QuizService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._quizService.list()
      .subscribe(quizes => this.quizes = quizes)
  }

  onEditClick(id: string) {
    this._router.navigate(['admin', 'quizes', 'edit', id]);
  }

  onViewClick(id: string) {
    this._router.navigate(['admin', 'quizes', 'view', id]);
  }

  onCreateNewClick() {
    this._router.navigate(['admin', 'quizes', 'create']);
  }
}
