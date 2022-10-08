import { Component, OnInit } from '@angular/core';
import {QuizListItem} from "../../../../../shared/interfaces/quiz-list-item.interface";
import {QuizService} from "../../../../../shared/services/quiz.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  quizes$: Observable<QuizListItem[]>| undefined;
  constructor(
    private _quizService: QuizService,
    private _router: Router,
    private _matSnackBar: MatSnackBar
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

  onDeleteClick(id: string) {
    this._quizService.delete(id)
      .subscribe(() => {
        this._matSnackBar.open("Deleted", '', {duration: 3000})
        this.quizes$ = this._quizService.list();
      })
  }
}
