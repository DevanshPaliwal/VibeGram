import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from '../screens/OnboardingScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from "../screens/SignupScreen";
import Octicons from 'react-native-vector-icons/Octicons'

const AppStack = createNativeStackNavigator()

const AuthStack = () => {
  const [isFirst, setIsFirst] = useState(null)
  let routeName
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirst(true)
      }
      else {
        setIsFirst(false)
      }
    })
  }, [])

  if (isFirst === null) {
    return null
  }
  else if (isFirst === true) {
    routeName = 'Onboarding'
  }
  else {
    routeName = 'Login'
  }
  return (
    <AppStack.Navigator
      initialRouteName={routeName}
      headerMode="none"
    >
      <AppStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ header: () => null }}
      />
      <AppStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <AppStack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#6DA7F8',
            elevation: 0,
            shadowColor: '#f9fafd',
          },
          headerLeft: () => (
            <View style={{marginLeft:3}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Octicons
                  name='chevron-left'
                  size={35}
                  color='white'
                />
              </TouchableOpacity>

            </View>
          ),
        })}
      />
    </AppStack.Navigator>
  )
}

export default AuthStack;