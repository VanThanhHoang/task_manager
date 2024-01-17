/* eslint-disable @typescript-eslint/no-unused-vars */
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChatListModel from './ChatListModel';
import UserModal from './UserModel';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;

};

export type AppStackParamList = {
  AllUserScreen: undefined;
  ChatScreen: {
    user: UserModal;
    chatlist: ChatListModel;
  };
  HomeScreen:undefined,
  ProfileScreen:undefined,
  DetailPaymentScreen:{ paymentInfo: Bill[], name: string },
  DetailRoomScreen:undefined,
  NotiScreen:undefined
};

export type RootStackParamList = {
  AuthStack: AuthStackParamList;
  AppStack: AppStackParamList;
};

export type authStackNavigationType =
  NativeStackNavigationProp<AuthStackParamList>;

export type appStackNavigationType =
  NativeStackNavigationProp<AppStackParamList>;

export type rootStackNavigationType =
  NativeStackNavigationProp<RootStackParamList>;

// export interface RootStackParamList
//   extends AuthStackParamList,
//     AppStackParamList {}
