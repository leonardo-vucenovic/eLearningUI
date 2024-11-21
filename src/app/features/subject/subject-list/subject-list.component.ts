import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject.model';
import { Observable } from 'rxjs';

//Informacije componente
@Component({
  selector: 'app-subject-list', //Naziv componente
  templateUrl: './subject-list.component.html', //HTML componente
  styleUrls: ['./subject-list.component.css'] //CSS componente
})
export class SubjectListComponent implements OnInit { //Kod stvaranja/prikazivanja componente na ekranu implements OnInit-Kad se prikaže componenta

  subjects$?: Observable<Subject[]>;
  //subjects je naziv varijable
  //$ oznacava da je varijabla Obeservable-konvencija među programerima za takve varijable
  //? oznacava da ova varijabla može biti prazno (undefined) u slučaju da metoda ne prođe i varijabla ostane prazna, oznaka da može biti null
  //također može pomoći ako podaci kasne i treba im vremena da se dohvate

  //Observable omogucava aplikaciji da prati promjene u listi
  //Kada se prikaže HTML podaci možda nisu odmah u listi nego se čeka server, Observable omogucava da aplikacija
  //kasnje u HTML se može pretplatiti odnosno može slušati listu i zbog Observable-a lišta obaviještava da se došlo
  //do promjene u listi i oni koji su pretplačeni slušaju i reagiraju na promjene u listi
  //Pogledaj HTML za daljnje objasnjenje
  //<Subject> označava tip podataka a [] označava da se radi o polju

  constructor(private subjectService: SubjectService) { } //Uz pomoc DI-a odmah se stvara instanca subjectService bez da ja moram kreirati tu instancu
  
  //Razlika izmedu ovog
  // ngOnInit(): void {
  //   this.subjectService.getAllSubjects()
  //   .subscribe({
  //     next: (response) => {
  //       this.subjects = response;
  //          .filter(subject => subject.isActive) // Primer filtera
  //          .sort((a, b) => a.name.localeCompare(b.name)); // Primer sortiranja po nazivu
  //     }
  //   });
  // }

  //Ovaj dolje nacin je bolji od ovog gore jer ne moram ništa raditi sa podacima prije prikaza na ekran
  //kada bi trebao sortirati ili filtrirati listu onda bi koristio ovaj nacin gore koji bi rekao
  //kada podaci dodu sortitaj listu pa ju onda zapiši u varijablu subjects odnosno onda ju tek prikaži nakon logike

  //Implementacija metode koju moram implementirati ako sam nasljedio OnInit na componenti gore
  ngOnInit(): void { //Metoda nema povratne vrijednosti
    //Pozovi metoda getAllSubjects preko servisa, dohvati ih i spremi ih sve u varijablu
    this.subjects$ = this.subjectService.getAll();
  }
}
