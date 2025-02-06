import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ChatService} from '../../services/chat.service';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css'],
})
export class ChatDialogComponent {
  public chatName: string = '';

  constructor(
    public dialogRef: MatDialogRef<ChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public chatService: ChatService
  ) {}

  public onAdd(): void {
    if (this.chatName) {
    this.chatService.addChat(this.chatName).subscribe(() => {
      this.dialogRef.close(this.chatName);
    });
    }
  }
}
