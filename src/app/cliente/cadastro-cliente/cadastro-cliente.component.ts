import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResponseApi } from 'src/app/shared/response-api';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  formGroup: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(
    private service : ClienteService,
    public dialogRef: MatDialogRef<CadastroClienteComponent>,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.cliente));
    this.initForm();
  }

  onSubmit(){

  }

  salvar(){
    this.ngxLoader.start();
    this.service.save(this.cliente).subscribe((responseApi: ResponseApi) => {
      console.log(responseApi['content']);
      this.showSuccess();
      this.ngxLoader.stop();
    }, err => {
      console.log('################error');
    });
  }

  showSuccess() {
    this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
  }

  initForm() {
    this.formGroup = this.fb.group({
      nome: '',
      valor: '',
      descricao: ''
    }, {

    })
  }

}
