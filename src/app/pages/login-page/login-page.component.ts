import { Component } from '@angular/core';
import {AuthModule} from '../../modules/auth/auth.module';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    AuthModule
  ],
  standalone: true,
})
export class LoginPageComponent {
  constructor() {}
}
