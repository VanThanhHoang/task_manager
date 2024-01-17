/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { localStorage } from './src/utils/storage';
async function  setUpNotification(){
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    localStorage.set("FCM",token)
    console.log("*****",token);
}
try{
    setUpNotification();
}catch(e){
    console.log(e);
}
AppRegistry.registerComponent(appName, () => App);
