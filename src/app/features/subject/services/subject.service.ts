import { Injectable } from '@angular/core';
import { AddSubjectRequest } from '../models/add-subject-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../models/subject.model';
import { environment } from 'src/environments/environment';
import { UpdateSubjectRequest } from '../models/update-subject-request.model';

//Sa ovim govorimo da je service dostupan globalno cijeloj aplikaciji, odnosno svim komponentama
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  //Kroz konstruktor ce Angular uz pomoc DI-a ubrizgati instancu pa ju ja ne moram stvarati ovdje
  //HttpClient služi za razgovor sa backend-om za HTTP zahtijeve poput Post,Put,Get,Delete
  constructor(private http: HttpClient) { }

  //Sve metode

  //addSubject - Naziv metode, naziv preko kojeg pozovem radnju metode
  //model: - Naziv za objekt kojeg primamo
  //AddSubjectRequest - Tip podataka modela kojeg primamo
  //: Observable<void> - Označava što metoda vraća, u ovom slučaju void pa ne vrača ništa i oznaka da je metoda Observable
  create(model: AddSubjectRequest) : Observable<Subject> { //Backend vraca tog kreiranog Subjecta, možda kasnje sa voida promijeniti na Subject (dodatno promijeniti komponentu gdje se poziva ova metoda)
    //Dodatno metoda mora biti Observable ako unutar nje koristim http jer ne znamo kada će backend vratiti odgovor
    
    //preko this.http pozovi post metodu na backendu i void označava da ništa ne dobivamo natrag od backenda
    //to bi značilo da post<void> označava što metoda sa backenda vraća i tu može biti to da dobivam natrag Subject
    //i onda nešto radim s njim ali zbog ovog gore void-a on označava povrat cijele metode
    //i zbog toga na kraju moram vratiti void, ne ovisno o tome što metoda sa backenda vrača
    //znači mogu dobiti natrag od backend-a Subject ali kad završi izvršavanje cijele metode na kraju moram vratiti void
    //unutar zagrada je definiran endpoint kojeg gađamo da pogodimo metodu i model koji šaljemo
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