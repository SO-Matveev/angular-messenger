import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {selectUsers} from '../../../../store/users/users.selectors';
import {addUsers} from '../../../../store/users/users.actions';
import {UserService} from '../../services/user.service';

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
    private userService: UserService,
    protected dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {
  }

  // Добавление пользователя
  public addUsers(): void {
    if (this.selectedUsers.length > 0) {
      this.userService.getUsersByIds(this.selectedUsers).subscribe(users => {
        this.store.dispatch(addUsers({ users }));
      });
    }
    this.dialogRef.close();
  }

  // Выбор пользователя
  public toggleUser(userId: string): void {
    const index = this.selectedUsers.indexOf(userId);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(userId);
    }
  }
}
