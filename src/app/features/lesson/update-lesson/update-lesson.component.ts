import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LessonService } from '../services/lesson.service';
import { Lesson } from '../models/lesson.model';
import { SubjectService } from '../../subject/services/subject.service';
import { Subject } from '../../subject/models/subject.model';
import { UpdateLessonRequest } from '../models/update-lesson-request.model';
import { LevelOfEducation } from '../../level-of-education/models/level-of-education.model';
import { UnderLevelOfEducation } from '../../under-level-of-education/models/under-level-of-education.model';
import { LevelOfEducationService } from '../../level-of-education/services/level-of-education.service';
import { UnderLevelOfEducationService } from '../../under-level-of-education/services/under-level-of-education.service';

@Component({
  selector: 'app-update-lesson',
  templateUrl: './update-lesson.component.html',
  styleUrls: ['./update-lesson.component.css']
})
export class UpdateLessonComponent implements OnInit, OnDestroy {

  lessonId: string | null = null;
  paramsSubscription?: Subscription;
  updateSubscription?: Subscription;
  deleteSubscription?: Subscription;
  getLessonByIdSubscription?: Subscription;

  subjects$?: Observable<Subject[]>;
  selectedSubject?: string;

  levelOfEducations$?: Observable<LevelOfEducation[]>;
  selectedLevelOfEducation?: string;

  underLevelOfEducations: UnderLevelOfEducation[] = [];
  selectedUnderLevelOfEducation?: string;

  lesson?: Lesson;
  selectedVideoFileUrl: string | null = null;
  selectedVideoFile?: File;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private subjectService: SubjectService,
    private levelOfEducationService: LevelOfEducationService,
    private underLevelOfEducationService: UnderLevelOfEducationService,
    private router: Router,) { }

  ngOnInit(): void {
    this.subjects$ = this.subjectService.getAll();
    this.levelOfEducations$ = this.levelOfEducationService.getAll();
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        const idString = params.get('id');
        if(this.lessonId) {
          this.getLessonByIdSubscription = this.lessonService.getById(this.lessonId)
          .subscribe({
            next: (response) => {
              this.lesson = response;
              this.selectedSubject = response.subject.id;
              this.selectedLevelOfEducation = response.levelOfEducation.id;
              this.selectedUnderLevelOfEducation = response.underLevelOfEducation.id;
              this.loadUnderLevelOfEducations(this.selectedLevelOfEducation);
              this.selectedVideoFileUrl = this.lesson.videoFileUrl;
            }
          });
        }
      }
    })
  }

  loadUnderLevelOfEducations(levelOfEducationId: string): void {
    this.underLevelOfEducationService.getAllByLevelOfEducationId(levelOfEducationId)
      .subscribe(response => {
        this.underLevelOfEducations = response;
        this.selectedUnderLevelOfEducation = this.lesson?.underLevelOfEducation.id;
      });
  }

  onLevelOfEducationChange(levelOfEducationId: string): void {
    this.loadUnderLevelOfEducations(levelOfEducationId);
  }

  onFormSubmit() : void {
    if(this.lesson && this.lessonId) { //Dodati logiku jos ?
      const updateLessonRequestFormData = new FormData();
      updateLessonRequestFormData.append('title', this.lesson.title);
      updateLessonRequestFormData.append('description', this.lesson.description);
      updateLessonRequestFormData.append('subjectId', String(this.selectedSubject ?? 0));
      updateLessonRequestFormData.append('levelOfEducationId', String(this.selectedLevelOfEducation ?? 0));
      updateLessonRequestFormData.append('underLevelOfEducationId', String(this.selectedUnderLevelOfEducation ?? 0));
      if(this.selectedVideoFile) {
        updateLessonRequestFormData.append('videoFile', this.selectedVideoFile); //Dodavanjae novog videa ako je odabran
      }
      this.updateSubscription = this.lessonService.update(this.lessonId, updateLessonRequestFormData)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/lekcije');
        }
      })
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedVideoFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedVideoFileUrl = e.target.result; // Postavi novi URL za prikaz odabranog videa
      };
      reader.readAsDataURL(this.selectedVideoFile);
    }
  }
  
  
  onDelete() : void {
    if(this.lessonId) {
      this.deleteSubscription = this.lessonService.delete(this.lessonId)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/lekcije');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
    this.getLessonByIdSubscription?.unsubscribe();
  }
}