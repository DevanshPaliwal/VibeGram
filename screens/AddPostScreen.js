import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AddPostScreen=()=> {
  return (
    <View style={styles.container}>
      <Text>AddPostScreen</Text>
    </View>
  )
}

export default AddPostScreen

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }

})