import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  @ViewChild("pdfViewer")
  public pdfViewer;

  constructor(
    private service : ClienteService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  gerarRelatorio(): void {
    this.ngxLoader.start();
    this.service.geraPdf().subscribe(
      (res) => {
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
        this.ngxLoader.stop();
      },
      (err) => {
        this.ngxLoader.stop();
      }
    );
  }

}
