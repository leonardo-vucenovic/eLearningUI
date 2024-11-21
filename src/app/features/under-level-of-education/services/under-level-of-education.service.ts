import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnderLevelOfEducation } from '../models/under-level-of-education.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnderLevelOfEducationService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<UnderLevelOfEducation[]> {
    return this.http.get<UnderLevelOfEducation[]>(`${environment.apiBaseUrl}/UnderLevelOfEducations/GetAll`);
  }

  getById(id: string): Observable<UnderLevelOfEducation> {
    return this.http.get<UnderLevelOfEducation>(`${environment.apiBaseUrl}/UnderLevelOfEducations/GetById/${id}`)
  }

  getAllByLevelOfEducationId(id: string) : Observable<UnderLevelOfEducation[]> {
    return this.http.get<UnderLevelOfEducation[]>(`${environment.apiBaseUrl}/UnderLevelOfEducations/GetAllByLevelOfEducationId/${id}`)
  }
}
