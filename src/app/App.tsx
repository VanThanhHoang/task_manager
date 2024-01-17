import React, {useEffect} from 'react';
import {
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from '../redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {AppNavigator} from '../navigations/AppNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import LoadingModal from '../components/modal/LoadingModal';
import messaging from '@react-native-firebase/messaging';
import {handleUpdateMessages} from '../Helper/handlers';

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
            translucent
          />
          <LoadingModal />
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};
export default App;
