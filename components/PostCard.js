import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {
    Container,
    Card, UserInfo,
    UserName, UserImage,
    UserInfoText, PostTime,
    PostText, PostImage, InteractionWrapper,
    Interaction, InteractionText,
    Divider
} from '../styles/FeedStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Image } from 'react-native-reanimated/lib/typescript/Animated'
import { AuthContext } from '../navigation/AuthProvider'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

const PostCard = ({ item, onDelete, onPress }) => {
    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState(null);

    likeIcon = item.liked ? 'heart' : 'heart-outline'
    likedColor = item.liked ? '#2e64e5' : '#333'
    if (item.likes == 1) {
        likeText = '1 Like'
    }
    else if (item.likes > 1) {
        likeText = item.likes + ' Likes'
    }
    else {
        likeText = 'Like'
    }
    if (item.comments == 1) {
        commentText = '1 Comment'
    }
    else if (item.comments > 1) {
        commentText = item.comments + ' Comments'
    }
    else {
        commentText = 'Comment'
    }

    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(item.userId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data: ', documentSnapshot.data())
                    setUserData(documentSnapshot.data())
                }
            })
    }

    useEffect(()=>{
        getUser()
    },[])
    return (
        <Card>
            <UserInfo>
                <UserImage source={{ uri: userData?userData.userImg ||
             'https://i.ibb.co/090DJgq/Screenshot-2024-07-29-171112.png'
             : 'https://i.ibb.co/090DJgq/Screenshot-2024-07-29-171112.png'
              }} />
                <UserInfoText>
                    <TouchableOpacity onPress={onPress}>
                        <UserName>{userData?userData.fname || 'Unkown' :'Unknown'} {userData?userData.lname || 'User' :'User'}</UserName>
                    </TouchableOpacity>
                    <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {item.postImg != null ? <PostImage source={{ uri: item.postImg.toString() }} /> : <Divider />}
            <InteractionWrapper>
                {/* active is checking true or false */}
                <Interaction active={item.liked}>
                    <Ionicons name={likeIcon} size={25} color={likedColor} />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Ionicons name="chatbubble-outline" size={25} color='#333' />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction >
                {user.uid == item.userId ?
                    <Interaction onPress={() => onDelete(item.id)}>
                        <Ionicons name="trash" size={25} color='#333' />
                    </Interaction> : null
                }

            </InteractionWrapper>
        </Card>
    )
}

export default PostCard