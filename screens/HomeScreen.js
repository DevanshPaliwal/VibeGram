import { View, Text, StyleSheet, FlatList, Alert, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FormButton from '../components/FormButton'
import { AuthContext } from '../navigation/AuthProvider'
import { Container } from '../styles/FeedStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PostCard from '../components/PostCard'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// dummy data Posts which we will receive dynamically

// const Posts = [
//     {
//         id: '1',
//         userName: 'Jenny Doe',
//         userImg: require('../assets/users/user-3.jpg'),
//         postTime: '4 mins ago',
//         post:
//             'Hey there, this is my test for a post of my social app in React Native.',
//         postImg: require('../assets/posts/post-img-3.jpg'),
//         liked: true,
//         likes: '14',
//         comments: '5',
//     },
//     {
//         id: '2',
//         userName: 'John Doe',
//         userImg: require('../assets/users/user-1.jpg'),
//         postTime: '2 hours ago',
//         post:
//             'Hey there, this is my test for a post of my social app in React Native.',
//         postImg: 'none',
//         liked: false,
//         likes: '8',
//         comments: '1',
//     },
//     {
//         id: '3',
//         userName: 'Ken William',
//         userImg: require('../assets/users/user-4.jpg'),
//         postTime: '1 hour ago',
//         post:
//             'Hey there, this is my test for a post of my social app in React Native.',
//         postImg: require('../assets/posts/post-img-2.jpg'),
//         liked: true,
//         likes: '1',
//         comments: '0',
//     },
//     {
//         id: '4',
//         userName: 'Selina Paul',
//         userImg: require('../assets/users/user-6.jpg'),
//         postTime: '1 day ago',
//         post:
//             'Hey there, this is my test for a post of my social app in React Native.',
//         postImg: require('../assets/posts/post-img-4.jpg'),
//         liked: true,
//         likes: '22',
//         comments: '4',
//     },
//     {
//         id: '5',
//         userName: 'Christy Alex',
//         userImg: require('../assets/users/user-7.jpg'),
//         postTime: '2 days ago',
//         post:
//             'Hey there, this is my test for a post of my social app in React Native.',
//         postImg: 'none',
//         liked: false,
//         likes: '0',
//         comments: '0',
//     },
// ];




const HomeScreen = ({navigation}) => {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);

    // fetch posts data from firebase and set 
    // loading to false, which removes the
    // skeleton view
    const fetchPosts = async () => {
        try {
            const list = [];
            await firestore()
                .collection('posts')
                .orderBy('postTime', 'desc')
                .get()
                .then((querySnapshot) => {
                    // console.log('Total posts: '+querySnapshot.size)
                    querySnapshot.forEach(doc => {
                        // fetching data from firestore
                        const { post, postImg, postTime, userId, likes, comments } = doc.data();
                        list.push({
                            id: doc.id,
                            userId: userId,
                            userName: 'Test User',
                            userImg: require('../assets/users/user-7.jpg'),
                            postTime: postTime,
                            post: post,
                            postImg: postImg,
                            liked: false,
                            likes: likes,
                            comments: comments,
                        })
                    })
                })
            setPosts(list);
            if (loading == true) {
                setLoading(false);
            }
            console.log('Posts: ' + list)
        }
        catch (error) {
            console.log(error)
        }
    }
    // render the homescreen initially
    useEffect(() => {
        fetchPosts();
    }, [])

    // whenever the deleted state changes, 
    // homescreen is rendered
    useEffect(() => {
        fetchPosts();
        setDeleted(false);
    }, [deleted])

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete post',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                }
            ],
            { cancelable: false }
        )
    }


    const deletePost = (postId) => {
        console.log('Current post: ' + postId);
        firestore().collection('posts')
            .doc(postId)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const { postImg } = documentSnapshot.data();
                    if (postImg != null) {
                        const storageRef = storage().refFromURL(postImg);
                        const imageRef = storage().ref(storageRef.fullPath)

                        imageRef
                            .delete()
                            .then(() => {
                                console.log(`${postImg} has been deleted successfully`);

                            })
                            .catch((e) => {
                                console.log(e);
                            })
                    }
                    deleteFirestoreData(postId);
                    // to re-render the homepage
                    setDeleted(true);
                }
            })
    }

    const deleteFirestoreData = (postId) => {
        firestore()
            .collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                Alert.alert("Post Deleted Successfully!")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {loading ?
                <ScrollView style={{ flex: 1, marginTop:10 }} contentContainerStyle={{ alignItems: 'center' }}>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }} />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 30 }}>
                            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
                            <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }} />
                            <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }} />
                        </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }} />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 30 }}>
                            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
                            <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }} />
                            <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }} />
                        </View>
                    </SkeletonPlaceholder>
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 20 }}>
                                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }} />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 30 }}>
                            <View style={{ width: 300, height: 20, borderRadius: 4 }} />
                            <View style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }} />
                            <View style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }} />
                        </View>
                    </SkeletonPlaceholder>

                </ScrollView> :
                <Container>
                    <FlatList
                        data={posts}
                        renderItem={({ item }) => <PostCard item={item} onDelete={handleDelete} onPress={()=>navigation.navigate('OtherUserProfile',{userId:item.userId})} />}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}

                    />
                </Container>
            }
        </SafeAreaView>
    )
}

export default HomeScreen
