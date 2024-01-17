export interface ChatScreen_Prop {}

export interface ChatMessage_Prop {
  isMine: Boolean;
  message: String | undefined;
  time: string;
  name:string,
  avatar:string,
}

export interface UserItem_Prop {
  avatar_url: String | '';
  name: String | undefined;
  onPress: Function;
}

export interface ChatFooter_Prop {
  message: string | undefined;
  setMessage: Function;
  handleMessage: Function;
}
