import { Profile } from './../../models/tarefas';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Investidores } from '../../models/tarefas';
import { ListagemService } from '../../services/listagem.service';
import { ProfilesService } from '../../services/profiles.service';
import { Estados } from '../../models/estados';
import { EstadosService } from '../../services/estados.service';
import { map, switchMap, tap } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss'],
  animations: [
    trigger('slide', [
      // ...
      state(
        'closed',
        style({
          width: '100px',
          opacity: 0,
          transform: 'translateX(0)',
        })
      ),
      state(
        'open',
        style({
          width: '100px',
          opacity: 1,
          transform: 'translateX(-10%)',
        })
      ),
      transition('closed => open', [animate('0.3s ease-in')]),
      transition('open => closed', [animate('0.3s  ease-in-out')]),
    ]),
  ],
})

// [
//   trigger('flyInOut', [
//     state('in', style({ transform: 'translatX(0)' , opacity:0})),
//     transition('void => *', [
//       style({ transform: 'translateX(100%' , opacity:1}),
//       animate(100),
//     ]),
//     transition('* => void', [
//       animate(100, style({ transform: 'translateX(100%' })),
//     ]),
//   ]),
// ],
export class CaracteristicasComponent implements OnInit {
  editar = false;
  investors: Investidores[] = [];
  formulario: FormGroup;
  perfis: Profile[] = [];
  estados: Estados[] = [];
  file!: Set<File>;
  submitted: boolean = false;
  showSucessMessage: boolean = false;
  disabledValue = true;

  constructor(
    private investidorService: ListagemService,
    private http: HttpClient,
    private profileService: ProfilesService,
    private estadosService: EstadosService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {
    this.formulario = new FormGroup({
      id: new FormControl(''),
      perfil: new FormControl(''),
      nome: new FormControl('', [Validators.minLength(3)]),
      aum: new FormControl({ value: '', disabled: true }),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl(''),
      }),
    });
  }

  ngOnInit(): void {
    this.investidorService.getInvestidor().subscribe((dados) => {
      //foi preciso buscar os investidores na service para popular as opções dos selects
      this.investors = dados;
    });
    this.profileService
      .getProfiles()
      .subscribe((dados) => (this.perfis = dados));
    this.estadosService
      .getEstados()
      .subscribe((dados) => (this.estados = dados));
    // this.route.params.subscribe((params: any) => {
    //   //pega o parametro de id da rota, busca o investidor por id na service e atribui  o id da rota
    //   const id = params['id'];
    //   const investor$ = this.investidorService.getById(id);
    //   investor$.subscribe((investor) => {
    //     this.updateForm(investor); //atualiza o formulario com os dados desse investidor
    //   });
    // });

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.investidorService.getById(id))
      )
      .subscribe((investidor) => {
        this.formulario.controls['id'].setValue(investidor.id);
        this.formulario.controls['nome'].setValue(investidor.nome);
        this.formulario.controls['profile']?.setValue(investidor.profile.nivel);
        this.updateForm(investidor);
        this.formulario.controls['profile'].value.disable()

      });
    //se criar um Resolve, pode popular os dados assim:
    // const investor = this.route.snapshot.data['investor']
    // this.formulario = new FormGroup({
    //   perfil: new FormControl(investor.perfil.nivel),
    //   nome: new FormControl(investor.nome),
    //   aum: new FormControl(investor.aum),
    //   estados: new FormControl(investor.endereco.estado),
    // });
  }

  updateForm(investidor: Investidores) {
    this.formulario.patchValue({
      id: investidor.id,
      nome: investidor.nome,
      aum: investidor.aum,
      // profile: investidor.profile?.nivel, - não populou o campo
      address: {
        street: investidor.endereco?.estado,
      },
    });
    this.formulario.get('perfil')?.setValue(investidor.profile?.nivel); //funciona!!
    this.formulario.get('perfil')?.valueChanges.pipe(
      tap((perfil) => console.log('perfil', perfil)),
      map((perfil) => this.perfis.filter((p) => p.nivel == perfil)),
      tap((perfil) => console.log('perfil', perfil))
    );
  }

  onSubmit() {
    console.log(this.formulario.value);
    //Tentou enviar
    this.submitted = true;
    let botaoEditar = this.el.nativeElement.querySelector('#edit');
    let botaoCancelar = this.el.nativeElement.querySelector('#cancel');
    let salvar = this.el.nativeElement.querySelector('.btn2');
    if (salvar.classList.contains('andar')) {
      salvar.classList.remove('andar');
    }

    //Valido?
    if (this.formulario.valid) {
      this.investidorService.patchInvestidor(this.formulario.value).subscribe(
        (success) => {
          console.log('ok', success);
          this.showSucessMessage = true;
          //Volta para false depois de 3 seg.
          setTimeout(() => (this.showSucessMessage = false), 3000);
          botaoCancelar.classList.remove('aparecer');
          botaoCancelar.classList.add('esconder');
          botaoEditar.classList.add('aparecer');
          salvar.classList.remove('aparecer');

          salvar.classList.add('esconder');
          botaoEditar.classList.remove('aparecer');

          botaoEditar.classList.add('esconder');
          setTimeout(() => {
            botaoEditar.classList.remove('esconder'),
              botaoEditar.classList.add('aparecer');
          }, 3000);
          this.formulario.disable();
        },
        (error) => {
          if (error.status === 404) {
            // A client-side or network error occurred. Handle it accordingly.
            alert('An error occurred:'+ error.error);
          } else if(error.status === 500) {
            alert('Servidor:'+ error.error)
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
              `Backend returned code ${error.status}, body was: `, error.error);
          }
        },
        () => console.log('update completo')
      );

      //Mostra mensagem de sucesso

      //Enviou
      this.submitted = false;
    }
    console.log(this.formulario);

  }

  onChange(event: any) {
    this.file = new Set();
    console.log(event);
    const selectedFiles = <FileList>event.target.files;
    document.getElementById('fileLabel')!.innerHTML = selectedFiles[0].name;
    this.file.add(selectedFiles[0]);
  }

  onUpload() {
    if (this.file && this.file.size > 0) {
      this.investidorService
        .getFile(this.file, 'http://localhost:3000/upload')
        .subscribe((response) => console.log('upload concluído'));
    }
  }

  isOpen = false;
  isShow = true;
  isHidden = true;

  toggle() {
    this.isOpen = !this.isOpen;
    this.isShow = !this.isShow;
    let botaoEditar = this.el.nativeElement.querySelector('#edit');
    let botaoCancelar = this.el.nativeElement.querySelector('#cancel');
    let salvar = this.el.nativeElement.querySelector('.btn2');
    if (
      botaoCancelar.classList.contains('esconder') ||
      botaoCancelar.classList.contains('aparecer') ||
      salvar.classList.contains('esconder') ||
      salvar.classList.contains('aparecer')
    ) {
      botaoCancelar.classList.remove('esconder');
      botaoCancelar.classList.remove('aparecer');
      salvar.classList.remove('aparecer');
      salvar.classList.remove('esconder');
    }

    if (!botaoEditar.classList.contains('esconder')) {
      botaoEditar.classList.remove('aparecer');
      botaoEditar.classList.add('esconder');
      botaoCancelar.classList.add('aparecer');
      salvar.classList.add('aparecer');
    } else {
      botaoEditar.classList.remove('esconder');
      botaoEditar.classList.add('aparecer');
      botaoCancelar.classList.remove('aparecer');
      botaoCancelar.classList.add('esconder');
      salvar.classList.remove('aparecer');
      salvar.classList.add('esconder');
    }

    //botao
    //    //só funciona na primeira vez
    // }else{
    //   botaoEditar.classList.remove('esconder')
    // }
    this.animar();
  }

  animar() {
    let salvar = this.el.nativeElement.querySelector('.btn2');
    if (!salvar.classList.contains('andar')) {
      salvar.classList.add('andar');
    } else {
      salvar.classList.remove('andar');
    }
  }

  showHiddenAoCancelar(): void {
    this.isHidden = !this.isHidden;
    this.isShow = true;
    let botaoEditar = this.el.nativeElement.querySelector('#edit');
    // let botoesDeAcao = this.el.nativeElement.querySelectorAll('.buttons');
    if (botaoEditar.classList.contains('esconder')) {
      botaoEditar.classList.remove('esconder');
      botaoEditar.classList.add('aparecer');
    }
    //   botoesDeAcao.classList.remove('esconder');
    //   botoesDeAcao.classList.add('aparecer');
    //   console.log('show');
    // }
  }

  ativar() {
    let li = this.el.nativeElement.querySelector('ul');
    li = document.activeElement;
    if (!li.classList.contains('active')) {
      li.classList.add('active');
    }
  }

  // let botaoEditar = this.el.nativeElement.querySelector('#edit');
  // let botoesDeAcao = this.el.nativeElement.querySelectorAll('.acoes-botoes');

  // botaoEditar.classList.contains('esconder');
  // botaoEditar.classList.remove('esconder');
  // botaoEditar.classList.add('aparecer');
  //   botoesDeAcao.classList.add('esconder');
  // }

  editarForm() {
    // this.editar = true;
    this.formulario.enable();
  }

  cancelar() {
    console.log('oi' + this.formulario);

    this.formulario.disable();
  }
}
