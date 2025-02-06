import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {ChatService} from '../../modules/chat/services/chat.service';
import {loadChats} from './chat.actions';

@Injectable()
export class ChatEffects {

  constructor(private actions$: Actions,
              private chatService: ChatService,
  ) {
  }

  loadChats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChats),
      mergeMap(() =>
        this.chatService.loadChats().pipe(
          catchError((error) => of({type: '[Chat] Load Chats Failure', error}))
        )
      )
    )
  );
}
