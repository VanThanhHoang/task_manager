export default interface MessageModel {
  id: String | null;
  roomId: String;
  message: String;
  from: String;
  to: String;
  sendTime: number |string;
  msgType: String;
  avatar:string,
  name:string
}
