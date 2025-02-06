import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import { EffectsModule } from '@ngrx/effects';
import {AuthModule} from './modules/auth/auth.module';
import {AuthEffects} from './store/auth/auth.effects';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {ChatModule} from './modules/chat/chat.module';
import { MatDialogModule } from '@angular/material/dialog';
const config: SocketIoConfig = { url: 'http://localhost:3000, options: {} ', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects]),
    MatDialogModule,
    AuthModule,
    ChatModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]

})
export class AppModule { }
