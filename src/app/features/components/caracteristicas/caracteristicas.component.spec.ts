import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasComponent } from './caracteristicas.component';

describe('CaracteristicasComponent', () => {
  let component: CaracteristicasComponent;
  let fixture: ComponentFixture<CaracteristicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaracteristicasComponent ],
      imports: [HttpClientModule, ActivatedRoute, ReactiveFormsModule, Router]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hidden button when is clicked', ()=> {
    let btn : HTMLElement = fixture.nativeElement.querySelector('#save')
    component.editar
    fixture.detectChanges()
    expect(btn.classList).toContain('andar')
  })

  it('should save datas of the form', () => {
    component.formulario.controls['nome'].setValue('any_name')
    component.formulario.controls['aum'].setValue('any_aum')
    component.formulario.controls['perfil'].setValue('any_perfil')
    component.onSubmit
    fixture.detectChanges()
    expect(component.formulario.controls['nome'].setValue).toEqual('any_name')

  })


  it('deve tornar valor da variavel isEdit verdadeira para o botão sumir durante a edição dos dados', () => {
    fixture.detectChanges()
    component.isEdit = false
    component.editar
    fixture.detectChanges()
    expect(component.isEdit).toBeTrue
});


}
)
