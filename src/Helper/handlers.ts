/* eslint-disable @typescript-eslint/no-unused-vars */
import {api} from '../Api/Api';
import UserModal from '../Models/UserModel';
import {Toast} from 'native-base';
import {navigate} from '../Helper/navigationHelper';
import { store } from "../Redux/store";
import { loadingOff, loadingOn } from '../redux/slices/loading/loadingSlice';
import { errorToast, successToast } from '../components/chat/Custom/customToasts';
import { clearMessages } from '../redux/slices/messages/messagesSlice';

export const handleRegister = async (payload: UserModal) => {
  try {
    // Dispatch action to on the loading
    store.dispatch(loadingOn());

    // Api hitting for sinup
    await api.signupUser(payload);

    // Dispatch action to off the loading
    store.dispatch(loadingOff());

    Toast.show({
      render: () => successToast ('Successfully Added User, Now Login'),
    });

    navigate('LoginScreen');
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error In Adding User'),
    });
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    // Dispatch action to on the loading
    store.dispatch(loadingOn());

    // Api hitting for login
    let user: UserModal = {
      id: email,
      name: email,
      email: '',
      password: '',
    };
   // await store.dispatch(loginUser(user));
    navigate('AppStack');
    // Dispatch action to off the loading
    store.dispatch(loadingOff());
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};


export const handleCreateChatList = async (
  currentUser: any,
  otherUser: any,
) => {
  try {
    // Dispatch action to on the loading
    store.dispatch(loadingOn());
    const chatList = await api.createChatList(currentUser, otherUser);
    navigate('ChatScreen', {
      user: otherUser,
      chatlist: chatList,
    });

    // Dispatch action to off the loading
    store.dispatch(loadingOff());
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};

export const handleSendMessage = async (
  senderId: string,
  recieverId: string,
  message: String,
  roomId: String,
  avatar:string,
  name:string,
) => {
  try {
    // Dispatch action to on the loading
    await api.sendMessage(senderId, recieverId, message, roomId,avatar,name);
    // Dispatch action to off the loading
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error In Sending Message.'),
    });
  }
};

export const handleFetchMessages = async (roomId: string) => {
  try {
    await api.fetchMessages(roomId);
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};

export const handleUpdateMessages = async (roomId: string = '1') => {
  try {
    console.log('Updating messages ...');
    await api.updateMessage(roomId);
    console.log('complete')
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};
export const handleClearMessages = () => {
  try {
    store.dispatch(clearMessages ());
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};
