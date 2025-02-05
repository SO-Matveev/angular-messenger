import {AuthComponent} from './components/auth/auth.component';
import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    NgIf
  ],
  providers: [],
  exports: [AuthComponent],
})

export class AuthModule {}
