import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { windowHeight } from '../utils/Dimentions'

const FormButton = ({buttonTitle, ...rest}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop:10,
        width:'100%',
        height:windowHeight/15,
        backgroundColor:'#2e64e5',
        padding:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3,
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#ffffff',
        fontFamily:'Late-Regular'
    },
})

export default FormButton