import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Animated, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker'
import { AuthContext } from '../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

const EditProfileScreen = () => {
  const { user, logout } = useContext(AuthContext)
  const [image, setImage] = useState()
  const [userData, setUserData] = useState(null)
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);


  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data: ', documentSnapshot.data())
          setUserData(documentSnapshot.data())
        }
      })
  }

  const handleUpdate = async () => {
    let imgUrl=await uploadImage()
    if(imgUrl==null && userData.userImg){
      imgUrl=userData.userImg;
    }
    firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      fname:userData.fname,
      lname:userData.lname,
      phone:userData.phone,
      userImg:imgUrl
    })
    .then(()=>{
      console.log('User updated!')
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      )
    })
  }

  useEffect(()=>{
    getUser()
  },[])

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
            <ImageBackground source={{ uri: image?image:userData?userData.userImg ||
             'https://i.ibb.co/090DJgq/Screenshot-2024-07-29-171112.png'
             : 'https://i.ibb.co/090DJgq/Screenshot-2024-07-29-171112.png'
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}
            >
            </ImageBackground>
          </View>

          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: 'black' }}>{userData?userData.fname :''} {userData?userData.lname:''}</Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user" size={20} color="grey" />
          <TextInput
            placeholder='First Name'
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.fname : ''}
            onChangeText={(txt) => setUserData({...userData, fname: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user" size={20} color="grey" />
          <TextInput
            placeholder='Last Name'
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.lname : ''}
            onChangeText={(txt) => setUserData({...userData, lname: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="phone" size={20} color="grey" />
          <TextInput
            placeholder='Phone No.'
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.phone : ''}
            onChangeText={(txt) => setUserData({...userData, phone: txt})}
            style={styles.textInput}
            keyboardType='number-pad'
          />
        </View>
        
        <TouchableOpacity style={styles.commandButton2} onPress={() => takePhotoFromCamera()}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton2} onPress={() => choosePhotoFromLibrary()}>
          <Text style={styles.panelButtonTitle}>Choose Photo from Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commandButton} onPress={() => handleUpdate()}>
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