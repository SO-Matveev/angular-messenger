import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../../store/auth/auth.actions';
import { AppState } from '../../../../store/app.interface';
import {AuthService} from '../../../auth/services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../../../core/interfaces/interfaces';
import {loadUsers} from '../../../../store/users/users.actions';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  protected user$: Observable<any>;


  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) {
    this.user$ = this.authService.getCurrentUser()
  }

  public onLogout(): void {
    this.store.dispatch(logout());
  }
}
