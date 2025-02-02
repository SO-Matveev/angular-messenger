import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  standalone: true,
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Переключение между входом и регистрацией
  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (this.isLoginMode) {
        // Вход
        this.authService.login(email, password).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.errorMessage = err.message;
          },
        });
      } else {
        this.authService.register(email, password).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.errorMessage = err.message;
          },
        });
      }
    }
  }
}
