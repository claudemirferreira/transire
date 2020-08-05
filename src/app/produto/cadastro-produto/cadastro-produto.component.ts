import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
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
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
})
export class CadastroProdutoComponent implements OnInit {

  formGroup: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();

  constructor(
    private service : ProdutoService,
    public dialogRef: MatDialogRef<CadastroProdutoComponent>,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public produto: Produto
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.produto));
    this.initForm();
  }

  salvar(){
    this.ngxLoader.start();
    this.service.save(this.produto).subscribe((responseApi: ResponseApi) => {
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
      verifyPassword: ''
    }, {
      validator: this.passwordValidator
    })
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('verifyPassword').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }


}
