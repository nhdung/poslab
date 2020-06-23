import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericRoutingModule } from './generic-routing.module';
import { GenericNavComponent } from './generic-nav/generic-nav.component';
import { DesComponent } from './des/des.component';
import { AesComponent } from './aes/aes.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GenericNavComponent, DesComponent, AesComponent],
  imports: [
    CommonModule,
    GenericRoutingModule,
    ClarityModule,
    ReactiveFormsModule
  ]
})
export class GenericModule { }
