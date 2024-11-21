import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddSubjectRequest } from '../models/add-subject-request.model';
import { SubjectService } from '../services/subject.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-subject', //Naziv componente
  templateUrl: './add-subject.component.html', //HTML componente
  styleUrls: ['./add-subject.component.css'] //CSS componente
})
export class AddSubjectComponent implements OnInit, OnDestroy { //Kod uništavanja/micanja sa componente na ekranu implements OnDestroy-Kad se odlazi sa componente

  //addSubjectRequest: AddSubjectRequest; //Varijabla koju cemo koristiti za stvaranje objekta za slanje da se doda u bazu podataka
  addSubjectRequestForm!: FormGroup; // Reactive FormGroup instance, usklicnih obecava da cemo inicijalizirati objekt što i radimo u OnInit metodi
  //Sam FormGroup je objekt koji grupira skup povezanih polja (kontrola(polja forme u koje korisnik nešto unosi)tekstualno polje, checkbox ili dropdown)
  //i on nam omogučava da radimo validaciju, status, vrijednost
  //kako bi mogli ispisivati pogreške kod submita forme (polje je obavezno) i slično
  private addSubjectSubscribtion?: Subscription; //Varijabla gdje cu spremiti stanje metode odnosno u kojoj je metoda fazi, pratim ju i u kojem je stanju metoda spremam tu
  
  constructor(
    private subjectService: SubjectService, 
    private router: Router, 
    private formBuilder: FormBuilder,) { //FormBuilder omogucava lakšu inicijalizaciju svake kontrole unutar FormGroupe i lakše grupiranje unutar jedne FormGroup-e
    //Uz pomoc DI-a odmah se stvara instanca subjectService i router-a (za rutiranje) bez da ja moram kreirati tu instancu
    // this.addSubjectRequest = { //Ali moram inicijalizirati varijablu model jer se ona ne moze inicijalizirati preko DI-a
    //   name: ''
    // }
  }
  ngOnInit(): void {
    //Uz pomoc formBuilder skupim sve kontrole unutar FormGroup
    //i dodajem im ime, pocetnu vrijednost i validators
    this.addSubjectRequestForm = this.formBuilder.group({
      name: ['', Validators.required] //Sa Validators-om dodajemo validatore, u ovom slucaju required na polje name, a kod inicijalizacije ondosno prikaze forme taj field je prazan
    });
  }

  onFormSubmit() {
    //Postoje pojmovi Observable i Subscribe
    //Observable se koristi kao ključna riječ kada želimo označiti da je metoda Observable
    //To znači da ta metoda ima mogučnost obaviještavanja onoka tko se na tu pretplati (Subscribe)
    //i obaviještava što se događa-metoda je završila izvršavanje, metoda je bacila error i slično
    //S obzirom da je metoda Observable na nju se možemo pretplatiti .subsrcibe-pretplatiti se na tu metodu
    //odnosno čuvati njihovu povezanost odnosno držati njihovu konekciju u varijabli (addSubjectSubscribtion)
    //s obzirom da sam se .subsrcibe na metodu, kada metoda završi (next) napravi mi to i to, ako metoda
    //baci error napravi mi to i to i na taj način mogu pratiti izvršavanje metoda
    //Ono što je važno napraviti .unsubsrcibe kada se klijent makne sa te određene stranice kako bi otpustio tu vezu
    //između metode i componente kako nebi došlo do curenja memorije i slično
    //A neki put se ne odjavljujemo na ovaj način (POGLEDAJ HTML subject-list)

    // this.addSubjectSubscribtion = this.subjectService.create(this.addSubjectRequest) //U HTML je definiraj model koje vrijednosti ima za koji properti
    // .subscribe({ //Zbog toga što je addSubject Observable, ovdje se mogu pretplatiti na tu metodu i pratiti ju
    //   next: (response) => { //Kad metoda završi napravi mi ovo
    //     this.router.navigateByUrl('/admin/predmeti'); //Kada dodas subject odveti me na ovu stranicu
    //   }//, //Ako metoda baci error napravi mi ovo
    //   // error: (error) => {
    //   // }
    // })

    if (this.addSubjectRequestForm.invalid) { // Provjera validnosti forme prije slanja, invalid je metoda koja je dio FormGroup-e, s njom se moze odmah prvojeriti dali su prošle sve validacije
      //Ako samo jedna valicija nije prošla
      //Oznaci sva polja kao touched, to znaci da ce se sva polja oznaciti kao da je korisnik nešto unio iako možda nije
      //kako bi onda svaku kontrolu (polje) provijerio i ispisao pogrešku za one koje ne ispunjavaju uvijet validacije
      this.addSubjectRequestForm.markAllAsTouched(); // Oznaci sva polja kao "touched" da bi se prikazale greske
      
      //Zaustavlja daljnje izvršavanje
      return;
    }

    //Ako je sve okej
    //Kreiraj mi AddSubjectRequest
    //Postavi mu vrijednost za svaki properti
    //u ovom slucaju samo jedan
    //Tu jednu vrijednost dohvacamo iz FormGroup po nazivu (u ovom slucaju name)
    const addSubjectRequest: AddSubjectRequest = {
      name: this.addSubjectRequestForm.value.name
    };

    //Ako je sve u redu tek onda pozovi metodu i pošalji objek AddSubjectRequest
    this.addSubjectSubscribtion = this.subjectService.create(addSubjectRequest).subscribe({
      next: () => {
        this.router.navigateByUrl('/admin/predmeti');
      }
    });
  }

  //Implementacija metode koju moram implementirati ako sam nasljedio OnDestroy na componenti gore
  ngOnDestroy(): void { //Metoda nema povratne vrijednosti
    //Kada se maknem sa ove stranice uništi mi vezu između componente i metode (addSubject) koja je Observable
    this.addSubjectSubscribtion?.unsubscribe();
  }
}