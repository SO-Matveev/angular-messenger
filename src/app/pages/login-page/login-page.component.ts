import { Component } from '@angular/core';
import {AuthModule} from '../../modules/auth/auth.module';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    AuthModule
  ],
  standalone: true,
})
export class LoginPageComponent {
  constructor() {}
}
