import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Channel, Message, User } from '../../core/interfaces/interfaces';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {ChatModule} from '../../modules/chat/chat.module';
import {Observable} from 'rxjs';

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
    ChatModule
  ],
  standalone: true
})
export class MainPageComponent implements OnInit {
  messageForm: FormGroup;
  user$: Observable<any>; // Информация о текущем пользователе

  channels: Channel[] = [
    { id: '1', name: '#general' },
    { id: '2', name: '#summer' },
    { id: '3', name: '#party' },
  ];
  messages: Message[] = [
    { id: '1', from_user: 'Maria', content: 'hey', channel_id: '1' },
    { id: '2', from_user: 'Max', content: 'hi, im work :(', channel_id: '1' },
  ];
  users: User[] = [
    { id: '1', username: 'Maria', is_online: true },
    { id: '2', username: 'Max', is_online: false },
    { id: '3', username: 'Andrew', is_online: true },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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

  public sendMessage() {
    if (this.messageForm.valid) {
      const newMessage: Message = {
        id: (this.messages.length + 1).toString(),
        from_user: 'Current User', // Замените на текущего пользователя
        content: this.messageForm.value.message,
        channel_id: '1', // Замените на текущий канал
      };
      this.messages.push(newMessage);
      this.messageForm.reset();
    }
  }

  public addUser() {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      username: `User-${this.users.length + 1}`,
      is_online: true,
    };
    this.users.push(newUser);
  }
  // Переход на страницу профиля
  public goToProfile() {
    this.router.navigate(['/profile']);
  }
  // Выход из системы
  public logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
