import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {handleSendMessage} from '../../Helper/handlers';
import {useSelector} from 'react-redux';
import ChatListModel from '../../Models/ChatListModel';
import {getTime} from '../../Helper/filter';
import MessageModel from '../../Models/MessageModel';
import ChatFooter from '../../components/chat/Chat/ChatFooter';
import ChatHeader from '../../components/chat/Chat/ChatHeader';
import {chat_styles} from '../../utils/Styles';
import Message from '../../components/chat/Chat/Message';
import {RootState, useAppSelector} from '../../redux';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import {useRoute} from '@react-navigation/native';
import {Axios} from 'axios';
import {Family} from '../../global';
import AxiosInstance from '../../utils/AxiosInstance';
const chatList: ChatListModel = {
  name: 'residentRoom',
  email: '1@gmail.com',
  roomId: '1',
  lastMsg: 'Hello',
  id: '1',
};
const reference = firebase
  .app()
  .database('https://task-manager-ba552-default-rtdb.firebaseio.com/')
  .ref('message');
const SingleChatScreen = () => {
  const [messageText, setMessageText] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const {family} = useRoute().params as {family: Family};
  const flatListRef = useRef<FlatList | null>(null);
  const {user} = useAppSelector(state => {
    return state.root.user;
  });
  useEffect(() => {
    const messageRef = database().ref('message/' + family._id);
    const handleSnapshot = (snapshot: any) => {
      if (snapshot.exists()) {
        const messagesArray = Object.values(snapshot.val());
        setMessages(messagesArray);
      }
    };
    messageRef.on('value', handleSnapshot);
    return () => {
      messageRef.off('value', handleSnapshot);
    };
  }, []);
  const sendNoti = () => {
    AxiosInstance().post('family/sendNotificationToFamily/' + family._id, {
      name: user.userName,
      message: messageText,
      familyName: family.name,
    });
  };
  async function handleMessage(data: any) {
    setMessageText('');
    var databaseRef = database().ref('message/' + family._id);
    try {
      databaseRef.push({
        id: user.id,
        messages: messageText,
        user: user.userName,
        img: user.image,
        timestamp: Date.now(),
      });
      sendNoti();
    } catch (err) {
      console.log(err);
    }
  }
  // can nhan vao room id
  return (
    <KeyboardAvoidingView style={{flex: 1, bottom: 0}}>
      <View style={chat_styles.container}>
        <ImageBackground
          source={require('../../assets/wallpaper3.png')}
          resizeMode="cover"
          style={chat_styles.bgImage}>
          <ChatHeader name={family.name} />
          <FlatList
            inverted
            ref={flatListRef}
            style={chat_styles.scroller}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <Pressable onPress={() => setShowProfile(true)}>
                  <Message
                    name={item.user}
                    avatar={item.img}
                    isMine={user.id === item.id}
                    message={item.messages}
                    time={getTime(item.timestamp)}
                  />
                </Pressable>
              );
            }}
          />
          <ChatFooter
            message={messageText}
            setMessage={setMessageText}
            handleMessage={handleMessage}
          />
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SingleChatScreen;
