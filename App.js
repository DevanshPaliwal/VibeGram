import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'

const AppStack = createNativeStackNavigator()

const App = () => {
  const [isFirst, setIsFirst] = useState(null)
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
    return (
      <NavigationContainer>
        <AppStack.Navigator
          headerMode="none"
        >
          <AppStack.Screen options={{ headerShown: false }} name="Onboarding" component={OnboardingScreen} />
          <AppStack.Screen name="Login" component={LoginScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }
  else{
    return <LoginScreen/>
  }
}

export default App;