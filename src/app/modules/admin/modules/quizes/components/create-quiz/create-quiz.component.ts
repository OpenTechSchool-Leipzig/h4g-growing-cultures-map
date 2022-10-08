import { Component, OnInit } from '@angular/core';
import {QuizDetail} from "../../../../../shared/interfaces/quiz-detail.interface";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuizService} from "../../../../../shared/services/quiz.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {QuizStep} from "../../../../../shared/interfaces/quiz-step.interface";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  detail: QuizDetail = {
    title: '',
    description: '',
    steps: []
  };

  stepsFormArray: FormArray = new FormArray([])

  formGroup = new FormGroup({
    'title': new FormControl('', [Validators.required, Validators.minLength(1)]),
    'description': new FormControl('', [Validators.required, Validators.minLength(1)]),
    'steps': this.stepsFormArray
  });

  isSaving: boolean = false;

  constructor(
    private _quizService: QuizService,
    private _matSnackBar: MatSnackBar,
    private _location: Location
  ) {
    this.formGroup.valueChanges.subscribe(v => this.detail = v)
  }
  ngOnInit(): void {
  }

  pushEmptyStepsArrayFormGroup(){
    this.stepsFormArray.push(new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'externalId': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'order': new FormControl(0),
    }))
    console.log(this.detail)
  }

  setStepValuesAtIndex(index: number, val: QuizStep){
    this.stepsFormArray.setControl(index, new FormGroup({
      'title': new FormControl(val.title, [Validators.required, Validators.minLength(1)]),
      'description': new FormControl(val.description, [Validators.required, Validators.minLength(1)]),
      'externalId': new FormControl(val.externalId, [Validators.required, Validators.minLength(1)]),
      'order': new FormControl(val.order),
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
    console.log(this.detail)
  }

  onRemoveStepClick(i: number) {
    this.detail.steps.splice(i, 1);
    this.stepsFormArray.removeAt(i);
    console.log(this.detail)
  }

  drop(event: CdkDragDrop<QuizStep>) {
    moveItemInArray(this.detail.steps, event.previousIndex, event.currentIndex);

    let a = this.detail.steps[event.previousIndex]
    let b = this.detail.steps[event.currentIndex]
    this.setStepValuesAtIndex(event.previousIndex, a)
    this.setStepValuesAtIndex(event.currentIndex, b)
    this.detail.steps.forEach((s, i) => s.order = i)
    this.setStepsArrayValues()
    console.log(this.detail)
  }

  onSaveClick() {
    if(this.formGroup.invalid)
    {
      this._matSnackBar.open("Please Fill In All Fields", '', {duration: 3000})
      return;
    }
    this.isSaving = true;
    this._quizService.create({...this.detail})
      .subscribe(() => {
        this.isSaving = false;
        this._matSnackBar.open("Saved", '', {duration: 3000})
        this._location.back();
      });
  }

  onGoBackClick() {
    this._location.back();
  }

}
