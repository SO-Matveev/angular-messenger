export interface User {
  id: string;
  username: string;
  is_online: boolean;
}

export interface Channel {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  from_user: string;
  content: string;
  channel_id: string;
}
