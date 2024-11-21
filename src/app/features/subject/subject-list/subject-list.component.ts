import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subjects$?: Observable<Subject[]>;
  constructor(private subjectService: SubjectService) { }
  ngOnInit(): void {
    this.subjects$ = this.subjectService.getAll();
  }
}
