import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddSubjectRequest } from '../models/add-subject-request.model';
import { SubjectService } from '../services/subject.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit, OnDestroy {


  addSubjectRequestForm!: FormGroup; 
  private addSubjectSubscribtion?: Subscription;
  
  constructor(
    private subjectService: SubjectService, 
    private router: Router, 
    private formBuilder: FormBuilder,) { 
  }
  ngOnInit(): void {
    this.addSubjectRequestForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onFormSubmit() {

    if (this.addSubjectRequestForm.invalid) { 
      this.addSubjectRequestForm.markAllAsTouched();
      return;
    }
    const addSubjectRequest: AddSubjectRequest = {
      name: this.addSubjectRequestForm.value.name
    };

    this.addSubjectSubscribtion = this.subjectService.create(addSubjectRequest).subscribe({
      next: () => {
        this.router.navigateByUrl('/admin/predmeti');
      }
    });
  }


  ngOnDestroy(): void {
    this.addSubjectSubscribtion?.unsubscribe();
  }
}
