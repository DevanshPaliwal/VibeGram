import React from "react";
import {View, Text, Button, StyleSheet, Alert} from 'react-native'

const LoginScreen=()=>{
    return(
        <View style={styles.container} >
            <Text>Login Screen</Text>
            <Button title='Click here'
             onPress={()=> Alert('Button Clicked')} />
        </View>
    )
} 

export default LoginScreen

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})