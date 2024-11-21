import { Injectable } from '@angular/core';
import { AddSubjectRequest } from '../models/add-subject-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../models/subject.model';
import { environment } from 'src/environments/environment';
import { UpdateSubjectRequest } from '../models/update-subject-request.model';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {



  constructor(private http: HttpClient) { }


  create(model: AddSubjectRequest) : Observable<Subject> {
    return this.http.post<Subject>(`${environment.apiBaseUrl}/Subjects/Create`, model)
  }

  getAll() : Observable<Subject[]> {
    return this.http.get<Subject[]>(`${environment.apiBaseUrl}/Subjects/GetAll`);
  }

  getById(subjectId: string) : Observable<Subject> {
    return this.http.get<Subject>(`${environment.apiBaseUrl}/Subjects/GetById/${subjectId}`)
  }

  update(subjectId: string, updateSubjectRequest: UpdateSubjectRequest) : Observable<Subject> {
    return this.http.put<Subject>(`${environment.apiBaseUrl}/Subjects/Update/${subjectId}`, updateSubjectRequest);
  }

  delete(subjectId: string) : Observable<Subject> {
    return this.http.delete<Subject>(`${environment.apiBaseUrl}/Subjects/Delete/${subjectId}`)
  }
}
