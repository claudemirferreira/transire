import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'cliente',
      loadChildren: 'app/cliente/cliente.module#ClienteModule',
  },
  { path: 'produto',
      loadChildren: 'app/produto/produto.module#ProdutoModule',
  },
  { path: 'venda',
      loadChildren: 'app/venda/venda.module#VendaModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
