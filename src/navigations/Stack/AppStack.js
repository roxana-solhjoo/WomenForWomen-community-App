import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {colors, sizes} from 'styles/theme';
import * as icons from 'assets/icons';
import * as images from 'assets/images';
import {
  Dashboard,
  GetRide,
  Community,
  News,
  Chat,
  Messages,
  NewDetails,
} from 'screens';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = () => {
  const App = createStackNavigator();
  return (
    <App.Navigator headerMode="none">
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="GetRide" component={GetRide} />
      <App.Screen name="Community" component={Community} />
      <App.Screen name="Message" component={Messages} />
      <App.Screen name="Chat" component={Chat} />
      <App.Screen name="News" component={News} />
      <App.Screen name="NewsDetail" component={NewDetails} />
    </App.Navigator>
  );
};

export {AppStack};
