import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericNavComponent } from './generic-nav/generic-nav.component';
import { DesComponent } from './des/des.component';
import { AesComponent } from './aes/aes.component';


const routes: Routes = [
  {
    path: 'generic',
    component: GenericNavComponent,
    children: [
      { path: 'des', component: DesComponent },
      { path: 'aes', component: AesComponent },
      { path: '', redirectTo: 'des', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericRoutingModule { }
