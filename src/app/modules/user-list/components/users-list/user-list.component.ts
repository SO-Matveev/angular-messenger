import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import {AddUserDialogComponent} from '../add-user-dialog/add-user-dialog.component';
import { loadUsers } from '../../../../store/users/users.actions';
import {selectUsers} from '../../../../store/users/users.selectors';


@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // Список пользователей
  protected users$ = this.store.select(selectUsers);

  constructor(
    private store: Store,
    private dialog: MatDialog)
  {}

  ngOnInit(): void {
    // Загрузка списка пользователей
    this.store.dispatch(loadUsers());
  }

  // Открытие диалога добавления пользователя
  public openAddUserDialog(): void {
    this.dialog.open(AddUserDialogComponent, {
      width: '400px',
    });
  }
}
