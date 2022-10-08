import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../../../shared/services/quiz.service";
import {QuizDetail} from "../../../../../shared/interfaces/quiz-detail.interface";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {QuizStep} from "../../../../../shared/interfaces/quiz-step.interface";
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  id: string = ''

  detail: QuizDetail = {
    title: '',
    description: '',
    steps: []
  };

  stepsFormArray: FormArray = new FormArray([])

  formGroup = new FormGroup({
    'title': new FormControl(''),
    'description': new FormControl(''),
    'steps': this.stepsFormArray
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _quizService: QuizService,
    private _location: Location
  ) {
    this.id = _activatedRoute.snapshot.params['id']
    this._quizService.details(this.id)
      .subscribe(detail => {
        this.detail = detail;
        this.formGroup.patchValue(this.detail)
        this.detail.steps.forEach(() => this.pushEmptyStepsArrayFormGroup())
        this.setStepsArrayValues()
      })
  }
  ngOnInit(): void {
  }

  pushEmptyStepsArrayFormGroup(){
    this.stepsFormArray.push(new FormGroup({
      'title': new FormControl(''),
      'description': new FormControl(''),
      'externalId': new FormControl(''),
      'order': new FormControl(''),
    }))
  }

  setEmptyStepsArrayFormGroupElement(index: number){
    this.stepsFormArray.setControl(index, new FormGroup({
      'title': new FormControl(''),
      'description': new FormControl(''),
      'externalId': new FormControl(''),
      'order': new FormControl(''),
    }))
  }

  setStepsArrayValues(){
    this.stepsFormArray.patchValue(this.detail.steps)
  }

  addStep() {
    this.detail.steps.push({
      title: '',
      description: '',
      externalId: '',
      order: 0
    });
    this.pushEmptyStepsArrayFormGroup()
    this.setStepsArrayValues()
  }

  onRemoveStepClick(i: number) {
    this.detail.steps.splice(i, 1);
    this.stepsFormArray.removeAt(i);
  }

  drop(event: CdkDragDrop<QuizStep>) {
    moveItemInArray(this.detail.steps, event.previousIndex, event.currentIndex);

    this.setEmptyStepsArrayFormGroupElement(event.previousIndex)
    this.setEmptyStepsArrayFormGroupElement(event.currentIndex)
    this.setStepsArrayValues()
  }

  onGoBackClick() {
    this._location.back();
  }
}
