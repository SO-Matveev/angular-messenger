import { createReducer, on } from '@ngrx/store';
import { loadChannelsSuccess, addChannelSuccess, loadMessagesSuccess, sendMessageSuccess } from './chat.actions';
import { Channel, Message } from '../../core/interfaces/interfaces';

export interface ChatState {
  channels: Channel[];
  messages: Message[];
}

export const initialState: ChatState = {
  channels: [],
  messages: [],
};

export const chatReducer = createReducer(
  initialState,
  on(loadChannelsSuccess, (state, { channels }) => ({ ...state, channels })),
  on(addChannelSuccess, (state, { channel }) => ({ ...state, channels: [...state.channels, channel] })),
  on(loadMessagesSuccess, (state, { messages }) => ({ ...state, messages })),
  on(sendMessageSuccess, (state, { message }) => ({ ...state, messages: [...state.messages, message] }))
);
