import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  id: string = ''
  constructor(
    private _activatedRoute: ActivatedRoute
  ) {
    this.id = _activatedRoute.snapshot.params['id']
  }
  ngOnInit(): void {
  }

}
