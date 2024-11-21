import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './features/subject/subject-list/subject-list.component';
import { AddSubjectComponent } from './features/subject/add-subject/add-subject.component';
import { UpdateSubjectComponent } from './features/subject/update-subject/update-subject.component';
import { LessonListComponent } from './features/lesson/lesson-list/lesson-list.component';
import { AddLessonComponent } from './features/lesson/add-lesson/add-lesson.component';
import { UpdateLessonComponent } from './features/lesson/update-lesson/update-lesson.component';

const routes: Routes = 
[
  {
    path: 'admin/predmeti',
    component: SubjectListComponent
  },
  {
    path: 'admin/predmeti/dodaj',
    component: AddSubjectComponent
  },
  {
    path: 'admin/predmeti/:id',
    component: UpdateSubjectComponent
  },
  {
    path: 'admin/lekcije',
    component: LessonListComponent
  },
  {
    path: 'admin/lekcije/dodaj',
    component: AddLessonComponent
  },
  {
    path: 'admin/lekcije/:id',
    component: UpdateLessonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
