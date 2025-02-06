import firebase from 'firebase/compat';
import FieldValue = firebase.firestore.FieldValue;

export interface User {
  id: string;
  username: string;
  email: string
  password: string
  is_online?: boolean;
}

export interface Chat {
  id: string;
  name?: string;
}

export interface Message {
  id: string;
  content?: string;
  from_user?: string;
  chatId?: string;
  timestamp?: string | Date | firebase.firestore.Timestamp;
}

