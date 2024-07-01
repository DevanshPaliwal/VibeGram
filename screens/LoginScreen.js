import React from "react";
import {View, Text, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native'

const LoginScreen=()=>{
    return(
        <View style={styles.container} >
            <Text>Login Screen</Text>
            <TouchableOpacity>
                <Text style={{color:'blue'}}>Click Here</Text>
            </TouchableOpacity>
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