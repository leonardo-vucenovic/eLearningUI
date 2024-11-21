import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { SubjectListComponent } from './features/subject/subject-list/subject-list.component';
import { AddSubjectComponent } from './features/subject/add-subject/add-subject.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { UpdateSubjectComponent } from './features/subject/update-subject/update-subject.component';
import { LessonListComponent } from './features/lesson/lesson-list/lesson-list.component';
import { AddLessonComponent } from './features/lesson/add-lesson/add-lesson.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { UpdateLessonComponent } from './features/lesson/update-lesson/update-lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,

    SubjectListComponent,
    AddSubjectComponent,
    UpdateSubjectComponent,
    LessonListComponent,
    AddLessonComponent,
    UpdateLessonComponent,
  ],
  imports: [
    BrowserModule, //Za rad u browseru
    AppRoutingModule, //Za rutiranje unutar aplikacije
    FormsModule, //Za rad sa formama
    HttpClientModule, //Za rad sa backendom-za servise
    ReactiveFormsModule //Za rad sa formama, validacija polja i to
  ],
  providers: [], //Servisi dostupni globalno za cijelu aplikaciju
  bootstrap: [AppComponent] //Glavna komponenta za podizanje aplikacije
})
export class AppModule { }
