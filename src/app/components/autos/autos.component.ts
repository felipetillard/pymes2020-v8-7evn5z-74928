import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../services/autos.service';
import { Auto } from "../../models/auto";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  autos:Auto[] = [];
   TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionAbmc = 'L';
  formGroup:FormGroup


  constructor(private autoService:AutosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAutos();
    this.createForm();
  }

  getAutos(){
    this.autoService.getAutos().subscribe((res:Auto[])=>{
      this.autos = res;
    });
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      IdAuto:[''],
      NombreAuto:[''],
      PrecioAuto:['', [Validators.required, Validators.pattern('[0-9]{1,10}')]]
    })
  }

  Modificar(auto){
    this.AccionAbmc = 'M';
    this.formGroup.patchValue(auto);
  }

  Volver(){
    this.AccionAbmc = 'L';
  }

  Grabar(){
    if(this.formGroup.invalid){
      return;
    }

    let itemCopy = {... this.formGroup.value};


     this.autoService
        .put(itemCopy.IdAuto, itemCopy)
        .subscribe((res: any) => {
          this.getAutos();
          this.Volver();      
     });
}
}