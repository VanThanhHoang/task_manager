/* eslint-disable @typescript-eslint/no-unused-vars */
import {createNavigationContainerRef} from '@react-navigation/native';
import ChatListModel from '../Models/ChatListModel';
import UserModal from '../Models/UserModel';
import { any_md5 } from "react-native-uuid/dist/md5";

export const navigationRef = createNavigationContainerRef();

export function navigate(
  name: any,
  params?: {user?: UserModal; chatlist?: ChatListModel} | any,
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}
