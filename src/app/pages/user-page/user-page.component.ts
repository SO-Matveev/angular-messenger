import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {User} from '../../core/interfaces/interfaces';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../store/users/users.selectors';
import { switchMap, map } from 'rxjs/operators';
import { loadUsers } from '../../store/users/users.actions';
import {UserService} from '../../modules/user-list/services/user.service';
import {logout} from '../../store/auth/auth.actions';


@Component({
  selector: 'app-users-profile',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  standalone:true
})
export class UserPageComponent implements OnInit {
  // Информация о текущем пользователе
  protected user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private userService: UserService,
  ) {

  }

  ngOnInit() {
    // Сначала загружаем список пользователей
    this.store.dispatch(loadUsers());

    // Инициализируем user$ после загрузки пользователей
    this.user$ = this.authService.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          this.router.navigate(['/login']);
        }
        return this.store.select(selectUsers).pipe(
          map(users => {
            const matchedUser = users.find(user => user.email === currentUser.email);
            if (!matchedUser) {
              throw new Error('Пользователь не найден');
            }
            return matchedUser;
          })
        );
      })
    );
  }

  // Выход из системы
  public logout() {
    this.store.dispatch(logout());
  }

  // Метод для возврата на главную страницу
  public goBack(): void {
    this.router.navigate(['/'])
  }
}
