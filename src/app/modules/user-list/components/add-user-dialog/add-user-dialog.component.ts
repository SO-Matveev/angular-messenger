import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {selectUsers} from '../../../../store/users/users.selectors';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  // Все зарегистрированные пользователи
  protected allUsers$ = this.store.select(selectUsers);
  // Выбранные пользователи
  public selectedUsers: string[] = [];

  constructor(
    private store: Store,
    protected dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {
  }

  // Добавление пользователя
  public addUsers(): void {
    this.dialogRef.close(this.selectedUsers);
  }

  // Выбор пользователя
  public toggleUser(userId: string): void {
    if (this.selectedUsers.includes(userId)) {
      this.selectedUsers = this.selectedUsers.filter((id) => id !== userId);
    } else {
      this.selectedUsers.push(userId);
    }
  }
}
