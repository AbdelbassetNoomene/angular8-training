import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentComponent } from './content/content.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { PropertiesHighlightDirective } from './shared/directives/properties-highlight.directive';
import { ShortTextDirective } from './shared/directives/short-text.directive';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserListComponent } from './user/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    DashboardComponent,
    ContentComponent,
    HighlightDirective,
    PropertiesHighlightDirective,
    ShortTextDirective,
    FilterPipe,
    UserListComponent,
    UserDetailsComponent
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
