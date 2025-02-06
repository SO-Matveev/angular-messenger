import {NgModule} from '@angular/core';
import {UserListComponent} from './components/users-list/user-list.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AddUserDialogComponent} from './components/add-user-dialog/add-user-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [UserListComponent, AddUserDialogComponent],
  imports: [
    AsyncPipe,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    NgForOf
  ],
  exports: [UserListComponent, AddUserDialogComponent]
})
export class UserListModuleModule {}
