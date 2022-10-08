import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuizListItem} from "../interfaces/quiz-list-item.interface";
import {environment} from "../../../../environments/environment";
import {QuizDetail} from "../interfaces/quiz-detail.interface";
import {UpdateQuizDetail} from "../interfaces/update-quiz-detail.interface";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  public list(): Observable<QuizListItem[]>{
    return this._httpClient.get<QuizListItem[]>(`${environment.mainApiUrl}/quiz/list`);
  }

  public details(id: string): Observable<QuizDetail>{
    return this._httpClient.get<QuizDetail>(`${environment.mainApiUrl}/quiz/details`, {
      params: {
        quizId: id
      }
    });
  }

  public update(model: UpdateQuizDetail): Observable<void>{
    return this._httpClient.post<void>(`${environment.mainApiUrl}/quiz/update`, model);
  }

  public create(model: QuizDetail): Observable<void>{
    return this._httpClient.post<void>(`${environment.mainApiUrl}/quiz/create`, model);
  }

  public delete(id: string): Observable<void>{
    return this._httpClient.delete<void>(`${environment.mainApiUrl}/quiz/delete`, {
      params: {
        quizId: id
      }
    });
  }
}
