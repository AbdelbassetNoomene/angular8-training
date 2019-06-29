import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
