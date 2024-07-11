import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Container, 
    Card, UserInfo, 
    UserName, UserImage,
    UserInfoText, PostTime, 
    PostText, PostImage, InteractionWrapper, 
    Interaction, InteractionText, 
    Divider} from '../styles/FeedStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PostCard = ({item}) => {
    likeIcon=item.liked?'heart':'heart-outline'
    likedColor=item.liked?'#2e64e5':'#333'
    if(item.likes==1){
        likeText='1 Like'
    }
    else if(item.likes>1){
        likeText=item.likes+' Likes'
    }
    else{
        likeText='Like'
    }
    if(item.comments==1){
        commentText='1 Comment'
    }
    else if(item.comments>1){
        commentText=item.comments+' Comments'
    }
    else{
        commentText='Comment'
    }
    return (
        <Card>
            <UserInfo>
                <UserImage source={item.userImg} />
                <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.postTime}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {item.postImg!='none'?<PostImage source={item.postImg}/>: <Divider />}
            <InteractionWrapper>
                {/* active is checking true or false */}
                <Interaction active={item.liked}>
                    <Ionicons name={likeIcon} size={25} color={likedColor} />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Ionicons name="chatbubble-outline" size={25} color='#333' />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>
            </InteractionWrapper>
        </Card>
    )
}

export default PostCard