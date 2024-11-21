import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject.model';
import { UpdateSubjectRequest } from '../models/update-subject-request.model';

@Component({
  selector: 'app-update-subject', //Naziv componente
  templateUrl: './update-subject.component.html', //HTML componente
  styleUrls: ['./update-subject.component.css'] //CSS componente
})
export class UpdateSubjectComponent implements OnInit, OnDestroy { //Kod stvaranja/prikazivanja i kod uništenja/odlaska sa componente na ekranu implements OnInit-Kad se prikaže componenta i implements OnDestroy kad se uništi komponenta odnosno kad odem s nje

  id: string | null = null; //Varijabla za cuvanje Id trenutno odabranog subject-a kod inicijalizacije componente
  paramsSubscription?: Subscription;
  updateSubjectSubscription?: Subscription;
  deleteSubjectSubscription?: Subscription;
  getSubjectByIdSubscription?: Subscription;
  subject?: Subject; //Varijabla za spremanje subject-a kojeg smo dohvatili kod inicijalizacije componente

  constructor( //Uz pomoc DI-a odmah se stvaraju instance bez da ja moram kreirati tu instancu
    private route: ActivatedRoute,  //Omogucuje componenti pristup trenutnoj ruti zbog npr. dohvacanja parametara kao što je npr Id
    private subjectService: SubjectService, //Subject servise za metode
    private router: Router) { //Router za rutiranje
    }
  
    //Kod stvaranje componente
    ngOnInit(): void {
    //paramMap je Observable pa se pretplacujem na metodu odnosno pratim ju ako se dogode promejene u URL-u ili kad metoda završi da znam
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => { //Kad metoda završi napravi mi ovo naparavi ovo dolje i spremi parametre u params
        const id = params.get('id'); //Dohvati id u string formatu
        if (this.id) { //Ako je dostupan i ako je broj
          //Pretplati se na metodu, sacuvaj vezu kroz varijablu i dohvati mi subject sa parametrom koji ti šaljem
          this.getSubjectByIdSubscription = this.subjectService.getById(this.id)
          .subscribe({ //Pretplati se na metodu
            next: (response) => { //Kad metoda završi napravi mi ovo
              this.subject = response; //Spremi mi response koji je zapravo Subject u varijablu subject
            }
          });
        }
      }
    });
  }

  onFormSubmit() {
    const updateSubjectRequest: UpdateSubjectRequest = { //Inicijalizacije objekta kojeg koristimo za update jer ga ne mogu inicijalizirati kroz DI-a
      name: this.subject?.name ?? ''
    };
    if(this.id) { //Ako je Id dostupan
      //Pretplati se na metodu, sacuvaj vezu kroz varzijablu updateSubjectSubscription i update-aj mi subject sa parametrima koje ti šaljem
      this.updateSubjectSubscription = this.subjectService.update(this.id, updateSubjectRequest)
      .subscribe({ //Pretplati se na metodu
        next: (response) => { //Kad metoda završi napravi mi ovo
          this.router.navigateByUrl('/admin/predmeti') //Kad update-aš subject odveti me na stranicu
        }
      })
    }
  }


  onDelete() : void {
    if(this.id) { //Ako je Id dostupan
      //Pretplati se na metodu, sacuvaj vezu kroz varijablu deleteSubjectSubscription i delete-aj mi subjectt sa parametrom koji ti šaljem
      this.deleteSubjectSubscription = this.subjectService.delete(this.id)
      .subscribe({ //Pretplati se na metodu
        next: (response) => { //Kad metoda završi napravi mi ovo
          this.router.navigateByUrl('/admin/predmeti') //Kad delet-aš subject odveti me na stranicu
        }
      })
    }
  }

  ngOnDestroy(): void {
    //Kad se maknem sa ove stranice uništi mi vezu izmedu componente i parametara
    //Kad se maknem sa ove stranice uništi mi vezu između componente i metoda updateSubject koja je Observable
    //Kad se maknem sa ove stranice uništi mi vezu između componente i metoda deleteSubject koja je Observable 
    //Kad se maknem sa ove stranice uništi mi vezu između componente i metoda getByIdSubject koja je Observable 
    this.paramsSubscription?.unsubscribe();
    this.updateSubjectSubscription?.unsubscribe();
    this.deleteSubjectSubscription?.unsubscribe();
    this.getSubjectByIdSubscription?.unsubscribe();
  }
}
//JA SAM DODATO SUBSRIPTION ZA DELETE i GETBYID