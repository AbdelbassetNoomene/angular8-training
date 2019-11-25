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
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './shared/services/token.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChatComponent } from './chat/chat.component';
import {ToastrModule} from 'ngx-toastr';
import {StompRService} from '@stomp/ng2-stompjs';
import {WebsocketService} from './shared/services/websocket.service';
import {NotifierModule, NotifierOptions} from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 15
    },
    vertical: {
      position: 'bottom',
      distance: 55,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    AuthComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    SweetAlert2Module.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    ToastrModule.forRoot({ timeOut: 3000 }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}, StompRService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
