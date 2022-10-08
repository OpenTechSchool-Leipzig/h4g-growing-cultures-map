import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  id: string = ''

  constructor(
    private _activatedRoute: ActivatedRoute
  ) {
    this.id = _activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
  }

}
