import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'


const ChatScreen = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#57C3E5'
          },
          left:{
            backgroundColor:'#E0E3E4'
          }
        }}
        textStyle={{
          right: {
            color: 'white'
          }
        }}
      />
    )
  }

  const renderSend=(props)=>{
    return(
      <Send {...props}>
        <View>
          <MaterialCommunityIcons name="send-circle" style={{marginBottom:5, marginRight:5}} size={40} color="#2e64e5" />
        </View>
      </Send>
    )
  }

  const scrollToBottomComponent=()=>{
    return(
      <Octicons name="arrow-down" color="black" size={25} />
    )
  }

  const renderInputToolbar = (props) =>{
    
    <InputToolbar {...props}
    containerStyle={{
      backgroundColor:'blue'
    }}
    />
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend={true}
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      // renderInputToolbar={renderInputToolbar}
    />
  );
}

export default ChatScreen