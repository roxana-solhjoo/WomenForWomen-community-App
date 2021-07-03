import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppStack, AuthStack} from './Stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const MainNavigation = () => {
  const {user} = useSelector(state => state.auth);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {/* <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppStack} /> */}

        {user === null ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
