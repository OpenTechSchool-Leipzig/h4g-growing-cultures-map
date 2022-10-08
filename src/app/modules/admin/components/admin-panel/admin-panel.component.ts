import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {


  constructor(
    private _router: Router
  ) { }

  ngOnInit(
  ): void {
  }

  onViewQuizesClick() {
    this._router.navigate(['admin', 'quizes']);
  }

  onViewUsersClick() {
    this._router.navigate(['admin', 'users']);
  }
}
