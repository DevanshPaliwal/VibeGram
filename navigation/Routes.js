import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "./AuthProvider";
import auth from '@react-native-firebase/auth'



const Routes = () => {

    const { user, setUser } = useContext(AuthContext)
    const [initialising, setInitialising] = useState(true)

    const onAuthStateChanged = (user) =>{
        setUser(user)
        if(initialising==true){
            setInitialising(false)
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])

    if(initialising==true){
        return null
        // or add activity loader
    }

    return (
        // if user is available, show AppStack (homescreen)
        // otherwise show AuthStack (onboarding and login/signup screen)
        <NavigationContainer>
            {user ? <AppStack/> :<AuthStack />}
        </NavigationContainer>
    )
}

export default Routes