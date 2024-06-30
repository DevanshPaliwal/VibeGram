import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {  createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'

const AppStack = createNativeStackNavigator()

const App=()=>{
  return(
    <NavigationContainer>
      <AppStack.Navigator
      headerMode="none"
      >
        <AppStack.Screen  options={{headerShown:false}} name="Onboarding" component={OnboardingScreen}/>
        <AppStack.Screen name="Login" component={LoginScreen}/>
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App;