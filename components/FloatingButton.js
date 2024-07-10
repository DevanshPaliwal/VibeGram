import { FloatingAction } from 'react-native-floating-action'
import {View,Text,  TouchableOpacity, Animated,StyleSheet} from 'react-native'
import React, { useRef, useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

const FloatingButton = () => {
  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.img}>
        <Octicons name="device-camera" size={30} color="white"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.img}>
        <Octicons name="image" size={30} color="white"/>
      </TouchableOpacity>
    </View>
  )
}
  
  const styles = StyleSheet.create({
    container: {
       position:'absolute',
       right:10,
       bottom:20
    },
    img:{
      backgroundColor:'red',
      height:60,
      width:60,
      borderRadius:30,
      justifyContent:'center',
      alignItems:'center',
      margin:5
    }
  })

export default FloatingButton