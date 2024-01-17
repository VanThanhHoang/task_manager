import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import React from 'react';
import {IconButton} from 'react-native-paper';
import MenuScreen from '../screens/menu';

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#092642',
        tabBarInactiveTintColor: '#A1A2A9',
      }}>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {fontSize: 11, fontWeight: 'bold'},
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <IconButton
                iconColor={color}
                icon="format-list-bulleted-type"
                size={30}
              />
            );
          },
        }}
        name="Gia đình"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {fontSize: 11, fontWeight: 'bold'},
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return (
              <IconButton iconColor={color} icon="account-details" size={30} />
            );
          },
        }}
        name="Tài khoản"
        component={MenuScreen}
      />
    </Tab.Navigator>
  );
}

export default AppTabs;
