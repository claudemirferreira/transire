import { ListEntregadorComponent } from './entregador/list-entregador/list-entregador.component';
import { ListProdutoComponent } from './produto/list-produto/list-produto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'entregador',
      loadChildren: 'app/entregador/entregador.module#EntregadorModule',
  },
  { path: 'produto',
      loadChildren: 'app/produto/produto.module#ProdutoModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
