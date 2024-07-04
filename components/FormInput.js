import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { windowHeight, windowWidth } from '../utils/Dimensions'

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View  style={styles.inputContainer} >
        <View  style={styles.iconStyle}>
        <Octicons  name={iconType} size={25} color="#666" />
        </View>
        <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        placeholderTextColor='#666'
        numberOfLines={1}
        {...rest}

        />
    </View>
    
  )
}

export default FormInput

const styles = StyleSheet.create({
    inputContainer:{
        marginTop:5,
        marginBottom:10,
        width:'100%',
        height:windowHeight/15,
        borderColor:'#ccc',
        borderRadius:22,
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    iconStyle:{
        padding:10,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'#ccc',
        borderRightWidth:1,
        width:50
    },
    input:{
       padding:10,
       flex:1,
       fontSize:16,
       fontFamily:'Lato-Regular',
       color:'#333',
       justifyContent:'center',
       alignItems:'center' 
    },
    inputField:{
        padding:10,
        marginTop:5,
        marginBottom:10,
        width:windowWidth/1.5,
        height:windowHeight/15,
        fontsize:16,
        borderRadius:8,
        borderWidth:1
    }
})