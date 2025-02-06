import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {ChatModule} from '../../modules/chat/chat.module';
import {Observable} from 'rxjs';
import {UserListModuleModule} from '../../modules/user-list/user-list.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ChatService} from '../../modules/chat/services/chat.service';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AuthService} from '../../modules/auth/services/auth.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    ChatModule,
    UserListModuleModule,
    MatDialogModule
  ],
  providers: [ChatService, provideAnimations()],
  standalone: true
})

export class MainPageComponent implements OnInit {
  messageForm: FormGroup;
  user$: Observable<any>; // Информация о текущем пользователе

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public chatService: ChatService,
    public authService: AuthService,

  ) {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {
    // Проверка авторизации
    this.authService.getCurrentUser().subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
    this.user$ = this.authService.getCurrentUser();
  }

  // // Выход из системы
  public logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  // // Переход на страницу профиля
  public goToProfile() {
    this.router.navigate(['/profile']);
  }

}
