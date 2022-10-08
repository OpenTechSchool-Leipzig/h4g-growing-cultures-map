import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuizListItem} from "../interfaces/quiz-list-item.interface";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  public list(): Observable<QuizListItem[]>{
    return this._httpClient.get<QuizListItem[]>(`${environment.apiUrl}/quiz/list`);
  }
}
