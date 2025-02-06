import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.interface';
import { EffectsModule } from '@ngrx/effects';
import {AuthModule} from './modules/auth/auth.module';
import {AuthEffects} from './store/auth/auth.effects';
import {ChatModule} from './modules/chat/chat.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ChatEffects } from './store/chat/chat.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects, ChatEffects]),
    MatDialogModule,
    AuthModule,
    ChatModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]

})
export class AppModule { }
