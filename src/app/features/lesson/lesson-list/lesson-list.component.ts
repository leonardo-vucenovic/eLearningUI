import { Component, OnInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson.model';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {

  lessons$?: Observable<Lesson[]>

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    this.lessons$ = this.lessonService.getAll();
  }
}
