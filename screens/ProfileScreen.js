import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import FormButton from '../components/FormButton'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import PostCard from '../components/PostCard'

const ProfileScreen = ({ navigation, route }) => {

    const { user, logout } = useContext(AuthContext)

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [userData, setUserData] = useState(null);

    // only show the posts made by 
    // logged in user
    const fetchPosts = async () => {
        try {
            const list = [];
            await firestore()
                .collection('posts')
                .where('userId', '==', route.params ? route.params.userId : user.uid)
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


    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(route.params ? route.params.userId : user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data: ', documentSnapshot.data())
                    setUserData(documentSnapshot.data())
                }
            })
    }


    // render the homescreen initially
    useEffect(() => {
        getUser();
        fetchPosts();
        navigation.addListener("focus", () => setLoading(!loading))
    }, [navigation, loading])

    const handleDelete = () => {}

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <Image style={styles.userImg} source={{
                    uri: userData ? userData.userImg ||
                        'https://i.ibb.co/090DJgq/Screenshot-2024-07-29-171112.png'
                        : 'https://i.ibb.co/090DJgq/Screenshot-2024-07-29-171112.png'
                }} />
                <Text style={styles.userName}>{userData ? userData.fname || 'Unknown' : 'Unknown'} {userData ? userData.lname || 'User' : 'User'}</Text>
                <Text style={{ color: 'black' }}>{route.params ? route.params.userId : user.uid}</Text>
                {/* <Text style={styles.aboutUser}>This is about section of Jenny Doe</Text> */}
                <Text></Text>
                <View style={styles.userBtnWrapper}>
                    {
                        route.params ? (
                            <>
                                <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                                    <Text style={styles.userBtnText} >Message</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                                    <Text style={styles.userBtnText} >Follow</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('EditProfile')}>
                                    <Text style={styles.userBtnText} >Edit Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                                    <Text style={styles.userBtnText} >Logout</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }

                </View>
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{posts.length}</Text>
                        <Text style={styles.userInfoSubTitle}>Posts</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>101k</Text>
                        <Text style={styles.userInfoSubTitle}>Followers</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>227</Text>
                        <Text style={styles.userInfoSubTitle}>Following</Text>
                    </View>
                </View>

                {
                    // if logged in user visits someone else's page
                    // then dont show anything
                    // otherwise show logged in user's posts
                    
                        posts.map((item) => {
                            return (
                                <PostCard
                                    key={item.id}
                                    item={item}
                                    onDelete={handleDelete}
                                />
                            )

                        })
                    

                }
            </ScrollView>
        </SafeAreaView>

    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: 'black'
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 12,
        paddingVertical: 9,
        paddingHorizontal: 12,
        marginHorizontal: 8,
    },
    userBtnText: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: 'black',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500'
    },
})