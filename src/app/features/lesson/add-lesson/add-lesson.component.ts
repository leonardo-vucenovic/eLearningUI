import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddLessonRequest } from '../models/add-lesson-request.model';
import { LessonService } from '../services/lesson.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SubjectService } from '../../subject/services/subject.service';
import { Subject } from '../../subject/models/subject.model';
import { LevelOfEducationService } from '../../level-of-education/services/level-of-education.service';
import { UnderLevelOfEducationService } from '../../under-level-of-education/services/under-level-of-education.service';
import { LevelOfEducation } from '../../level-of-education/models/level-of-education.model';
import { UnderLevelOfEducation } from '../../under-level-of-education/models/under-level-of-education.model';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit , OnDestroy{

  addLessonRequest: AddLessonRequest;
  selectedLessonVideoFileUrl: string | null = null;
  private addLessonSubscribtion?: Subscription;
  subjects$?: Observable<Subject[]>;
  levelOfEducations$?: Observable<LevelOfEducation[]>;
  underLevelOfEducations: UnderLevelOfEducation[] = [];

  constructor(
    private lessonService: LessonService, 
    private subjectService: SubjectService, 
    private levelOfEducationService: LevelOfEducationService, 
    private underLevelOfEducationService: UnderLevelOfEducationService, 
    private router: Router) {
    this.addLessonRequest = {
      title: '',
      description: '',
      videoFile: null,
      //fileUrl: '',
      subjectId: '',
      levelOfEducationId: '',
      underLevelOfEducationId: '' }}
      
  ngOnInit(): void {
    this.subjects$ = this.subjectService.getAll();
    this.levelOfEducations$ = this.levelOfEducationService.getAll();
  }

  onFormSubmit() : void {
    if(this.addLessonRequest.videoFile) {
      const formDataAddLessonRequest = new FormData();
      formDataAddLessonRequest.append('title', this.addLessonRequest.title);
      formDataAddLessonRequest.append('description', this.addLessonRequest.description);
      formDataAddLessonRequest.append('videoFile', this.addLessonRequest.videoFile);
      formDataAddLessonRequest.append('subjectId', this.addLessonRequest.subjectId.toString());
      formDataAddLessonRequest.append('levelOfEducationId', this.addLessonRequest.levelOfEducationId.toString());
      formDataAddLessonRequest.append('underLevelOfEducationId', this.addLessonRequest.underLevelOfEducationId.toString());

      this.addLessonSubscribtion = this.lessonService.create(formDataAddLessonRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/lekcije')
        }
      })
    }
  }

  onLevelOfEducationChange(levelOfEducationId: string): void {
    this.underLevelOfEducationService.getAllByLevelOfEducationId(levelOfEducationId)
    .subscribe(response => {
      this.underLevelOfEducations = response;
      this.addLessonRequest.underLevelOfEducationId = '';
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.addLessonRequest.videoFile = input.files[0];
      const reader = new FileReader();

      
      reader.readAsDataURL(input.files[0]);
      reader.onload = (e: any) => {
        this.selectedLessonVideoFileUrl = e.target.result;
      };
    }
  }

  ngOnDestroy(): void {
    this.addLessonSubscribtion?.unsubscribe();
  }
}
