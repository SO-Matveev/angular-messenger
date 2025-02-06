import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, switchMap, mergeMap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ChatService} from '../../modules/chat/services/chat.service';
import {addChat, loadChats, loadChatsSuccess} from './chat.actions';
import {Socket} from 'ngx-socket-io';

@Injectable()
export class ChatEffects {

  constructor(private actions$: Actions,
              private chatService: ChatService,
              private socket: Socket,
  ) {
  }

  loadChats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChats),
      mergeMap(() =>
        this.chatService.loadChats().pipe(
          catchError(() => of({type: '[Chat] Load Chats Failure'}))
        )
      )
    )
  );

  chatAdded$ = createEffect(() =>
    this.socket.fromEvent('chatAdded').pipe(
      map((chat: any) => addChat({chat}))
    )
  );


}
