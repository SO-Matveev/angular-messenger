import { Component } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  standalone:true
})
export class UserProfileComponent {
  // Информация о текущем пользователе
  user$: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.getCurrentUser();
  }

  // Выход из системы
  public logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
