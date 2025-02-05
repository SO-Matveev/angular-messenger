import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import { EffectsModule } from '@ngrx/effects';
import {AuthModule} from './modules/auth/auth.module';
import {AuthEffects} from './store/auth/auth.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects]),
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
