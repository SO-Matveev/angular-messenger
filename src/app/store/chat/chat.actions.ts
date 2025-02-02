import {createAction, props} from '@ngrx/store';
import {Channel, Message} from '../../core/interfaces/interfaces';

export const loadChannels = createAction('[Chat] Load Channels');
export const loadChannelsSuccess = createAction('[Chat] Load Channels Success', props<{ channels: Channel[] }>());
export const loadChannelsFailure = createAction('[Chat] Load Channels Failure', props<{ error: any }>());

export const addChannel = createAction('[Chat] Add Channel', props<{ channel: Channel }>());
export const addChannelSuccess = createAction('[Chat] Add Channel Success', props<{ channel: Channel }>());
export const addChannelFailure = createAction('[Chat] Add Channel Failure', props<{ error: any }>());

export const loadMessages = createAction('[Chat] Load Messages', props<{ channelId: string }>());
export const loadMessagesSuccess = createAction('[Chat] Load Messages Success', props<{ messages: Message[] }>());
export const loadMessagesFailure = createAction('[Chat] Load Messages Failure', props<{ error: any }>());

export const sendMessage = createAction('[Chat] Send Message', props<{ message: Message }>());
export const sendMessageSuccess = createAction('[Chat] Send Message Success', props<{ message: Message }>());
export const sendMessageFailure = createAction('[Chat] Send Message Failure', props<{ error: any }>());
