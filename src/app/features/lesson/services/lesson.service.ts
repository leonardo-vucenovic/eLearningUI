import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../models/lesson.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  create(formDataAddLessonRequest: FormData) : Observable<Lesson> {
    return this.http.post<Lesson>(`${environment.apiBaseUrl}/Lessons/Create`, formDataAddLessonRequest)
  }

  getAll() : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${environment.apiBaseUrl}/Lessons/GetAll`);
  }

  getById(lessonId: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${environment.apiBaseUrl}/Lessons/GetById/${lessonId}`)
  }

  update(lessonId: string, formDataAddLessonRequest: FormData) : Observable<Lesson> {
    return this.http.put<Lesson>(`${environment.apiBaseUrl}/Lessons/Update/${lessonId}`, formDataAddLessonRequest);
  }

  delete(lessonId: string) : Observable<Lesson> {
    return this.http.delete<Lesson>(`${environment.apiBaseUrl}/Lessons/Delete/${lessonId}`);
  }
}
