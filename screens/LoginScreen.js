import React from "react";
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'


const LoginScreen=({navigation})=>{
    return(
        <View style={styles.container} >
            <Octicons  name="person" size={25} color="#666" />
            <Text>Login Screen</Text>
            <TouchableOpacity>
                <Text style={{color:'blue'}} onPress={()=>navigation.navigate('Signup')} >Click Here</Text>
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