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
      const formDataAddLessonRequest = new FormData(); //Sluzi za slanje razlicitih tipova podataka gdje se ukljucuje i binarcni podaci kao što su slike i videa
      //u taj objekt dodajem sve što zelim prebaciti na backend kao append metoda i onda taj objekt šaljem backendu
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

  //Event se šalje iz html jer to zapravo i je html kada korisnik odabere video
  //i event sadrži informacije o odabranom file-u
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement; //event.target predstavlja html element koji je izazvao ovaj dogadaj u ovom slucaju je to bio file (<input type="file")
    //znaci element u html file za dodavanje videa je izazvao ovaj dogadaj i sada ga ja castam as HTMLInputElement
    //kako bi oznacio da je input tipa podataka HTMLInputElement kako bi mogli pristupiti podaci koje ima taj dodani file

    if (input.files && input.files.length > 0) { //Ako je file odabran odnosno ako nije null ii ako je file veci od 0, znaci da je datoteka odabrana 
      this.addLessonRequest.videoFile = input.files[0]; // u objekt addVideoRequest spremi file (Uzima se prva (i u ovom slučaju jedina) datoteka koju je korisnik odabrao.)
      const reader = new FileReader();//Kreiraj reader koji ce mi pomoci citati sadrzaj datoteke

      
      reader.readAsDataURL(input.files[0]); //sa pomoc reader-a procitaj sve iz datoteke
      //Kad završi učitavanje
      reader.onload = (e: any) => { //Kada reader procita sve do kraja, e je objekt koji sadrži informacije o završetku učitavanja
        this.selectedLessonVideoFileUrl = e.target.result; //postavi mi URL koji prestavlja sadržaj videa
      };
    }
  }

  ngOnDestroy(): void {
    this.addLessonSubscribtion?.unsubscribe();
  }
}
