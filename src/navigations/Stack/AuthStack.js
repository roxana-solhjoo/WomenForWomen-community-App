import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Register, Intro } from 'screens'

const AuthStack = () => {
    const Auth = createStackNavigator()
    return (
        <Auth.Navigator headerMode="none">
            {/* <Auth.Screen name="Intro" component={Intro}  /> */}
            <Auth.Screen name="Login" component={Login}  />
            <Auth.Screen name="Register" component={Register}  />
        </Auth.Navigator>

        
    )
}

export {AuthStack}
