import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LevelOfEducation } from '../models/level-of-education.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelOfEducationService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<LevelOfEducation[]> {
    return this.http.get<LevelOfEducation[]>(`${environment.apiBaseUrl}/LevelOfEducations/GetAll`);
  }

  getById(id: string): Observable<LevelOfEducation> {
    return this.http.get<LevelOfEducation>(`${environment.apiBaseUrl}/LevelOfEducations/GetById/${id}`)
  }
}
