import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { AddImage, InputField, InputWrapper, StatusWrapper, SubmitBtn, SubmitBtnText } from '../styles/AddPostStyles'
import Octicons from 'react-native-vector-icons/Octicons'
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'

const AddPostScreen = () => {

  const { user, logout } = useContext(AuthContext)

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const takePhotoFromCamera = async () => {
    try {
      await ImagePicker.openCamera({
        width: 1200,
        height: 780,
        cropping: true,
      }).then((image) => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  const choosePhotoFromLibrary = async () => {
    try {
      await ImagePicker.openPicker({
        width: 1200,
        height: 780,
        cropping: true,
      }).then((image) => {
        console.log(image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image URL: ' + imageUrl);
    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comments: null
      }).then(() => {
        console.log('Post Added!')
        Alert.alert('Post Published!');
        setPost(null);
      }).catch((error) => {
        console.log('Something went wrong while adding to firestore ', error)
      })
  }

  const uploadImage = async () => {
    if (image != null) {
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;

      setUploading(true)
      setTransferred(0)

      const storageRef = storage().ref(`photos/${filename}`)
      const task = storageRef.putFile(uploadUri)
      // set transferred state 
      // while image is transferring, play some animation
      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
        )
      });

      try {
        await task;

        const url = await storageRef.getDownloadURL()
        setUploading(false)
        setImage(null)
        return url;
      }
      catch (error) {
        console.log(error)
        return null
      }
    }
    else{
      return null;
    }
  }

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{ uri: image }} /> : null}
        <InputField
          placeholder="What's on your mind?"
          placeholderTextColor='#A1A3A4'
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {
          uploading ? (
            <StatusWrapper>
              <Text style={{ color: '#5C5E5F' }}>{transferred}% completed</Text>
              <ActivityIndicator size="large" color="blue" />
            </StatusWrapper>
          ) : (
            <SubmitBtn onPress={() => submitPost()}>
              <SubmitBtnText>Post</SubmitBtnText>
            </SubmitBtn>
          )
        }

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.img} onPress={() => takePhotoFromCamera()} >
            <Octicons name="device-camera" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.img} onPress={() => choosePhotoFromLibrary()} >
            <Octicons name="image" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </InputWrapper>
    </View>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    position: 'absolute',
    right: 10,
    bottom: 20
  },
  img: {
    backgroundColor: '#80D2F9',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  }
})