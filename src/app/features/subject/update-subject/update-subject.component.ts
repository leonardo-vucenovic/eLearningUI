import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject.model';
import { UpdateSubjectRequest } from '../models/update-subject-request.model';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  updateSubjectSubscription?: Subscription;
  deleteSubjectSubscription?: Subscription;
  getSubjectByIdSubscription?: Subscription;
  subject?: Subject;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private router: Router) {
    }
  
    ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (this.id) {
          this.getSubjectByIdSubscription = this.subjectService.getById(this.id)
          .subscribe({
            next: (response) => {
              this.subject = response;
            }
          });
        }
      }
    });
  }

  onFormSubmit() {
    const updateSubjectRequest: UpdateSubjectRequest = {
      name: this.subject?.name ?? ''
    };
    if(this.id) {
      this.updateSubjectSubscription = this.subjectService.update(this.id, updateSubjectRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/predmeti')
        }
      })
    }
  }


  onDelete() : void {
    if(this.id) { 
      this.deleteSubjectSubscription = this.subjectService.delete(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/predmeti')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateSubjectSubscription?.unsubscribe();
    this.deleteSubjectSubscription?.unsubscribe();
    this.getSubjectByIdSubscription?.unsubscribe();
  }
}
