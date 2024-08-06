import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Animated } from 'react-native'
import React, { useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker'


const EditProfileScreen = () => {
  const [image, setImage] = useState()

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  }


  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{
            height: 100,
            width: 100,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ImageBackground source={{uri:image}}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}
            >
            </ImageBackground>
          </View>

          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: 'black' }}>John Doe</Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user" size={20} color="grey" />
          <TextInput
            placeholder='First Name'
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user" size={20} color="grey" />
          <TextInput
            placeholder='Last Name'
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="phone" size={20} color="grey" />
          <TextInput
            placeholder='Phone No.'
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            keyboardType='number-pad'
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope" size={20} color="grey" />
          <TextInput
            placeholder='Email ID'
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            keyboardType='email-address'
          />
        </View>
        <TouchableOpacity style={styles.commandButton2} onPress={() => takePhotoFromCamera()}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton2} onPress={() => choosePhotoFromLibrary()}>
          <Text style={styles.panelButtonTitle}>Choose Photo from Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
          <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fa9657',
    alignItems: 'center',
    marginTop: 10,
  },
  commandButton2: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#57b0fa',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});