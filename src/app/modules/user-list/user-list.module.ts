import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './components/users-list/user-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AddUserDialogComponent} from './components/add-user-dialog/add-user-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {RouterLink} from '@angular/router';

@NgModule({
  declarations: [UserListComponent, AddUserDialogComponent, UserProfileComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink
  ],
  exports: [UserListComponent, AddUserDialogComponent, UserProfileComponent]
})
export class UserListModuleModule {}
