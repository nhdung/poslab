import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerConsoleComponent } from './logger-console/logger-console.component';
import { AppRoutingModule } from './app-routing.module';
import { GenericModule } from './generic/generic.module';

@NgModule({
  declarations: [
    AppComponent,
    LoggerConsoleComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GenericModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
