import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of, switchMap} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
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
      switchMap(() =>
        this.chatService.loadChats().pipe(
          map(() => loadChatsSuccess({chats: []})), // Успешная загрузка
          catchError(() => of({type: '[Chat] Load Chats Failure'})) // Обработка ошибок
        )
      )
    )
  )

  chatAdded$ = createEffect(() =>
    this.socket.fromEvent('chatAdded').pipe(
      map((chat: any) => addChat({chat}))
    )
  );


}
