import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import ProfileScreen from '../screens/ProfileScreen'
import AddPostScreen from '../screens/AddPostScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import MessagesScreen from '../screens/MessagesScreen'
import ChatScreen from '../screens/ChatScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const FeedStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name='VibeGram'
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#2e64e5',
          fontSize: 20,
          
        },
        headerStyle: {
          shadowStyle: '#fff',
          elevation: 0,

          
          
          
        },
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
              <Octicons name="plus" size={28} color='#2e64e5'/>
            </TouchableOpacity>
          </View>
        ),
      }}
    />

    <Stack.Screen name='AddPost'
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: { 
          backgroundColor:'#D5E4FA',          
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Octicons name="chevron-left" size={25} color="#2e64e5" />
          </View>
        ),
        
      }}
    />

    <Stack.Screen name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Octicons name="arrow-left" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
)

const MessageStack = ({navigation}) => (
  <Stack.Navigator
  
  >
    <Stack.Screen name="MessageList" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserProfile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);


const AppStack=()=>{
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: '#2e64e5',
        tabBarStyle:[
          {
            display:'flex'
          },
          null
        ]
      }}>

      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      
      
    </Tab.Navigator>
  )
}


export default AppStack