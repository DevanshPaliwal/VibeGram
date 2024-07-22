import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'
import FormButton from '../components/FormButton'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import PostCard from '../components/PostCard'

const ProfileScreen = () => {

    const { user, logout } = useContext(AuthContext)

    const [posts, setPosts] = useState([]);
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
                .where('userId', '==', user.uid)
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

    const handleDelete = () => { }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <Image style={styles.userImg} source={require('../assets/users/user-8.jpg')} />
                <Text style={styles.userName}>Jenny Doe</Text>
                <Text style={styles.aboutUser}>This is about section of Jenny Doe</Text>
                <View style={styles.userBtnWrapper}>
                    <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                        <Text style={styles.userBtnText} >Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                        <Text style={styles.userBtnText} >Follow</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>22</Text>
                        <Text style={styles.userInfoSubTitle}>Posts</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>10.1k</Text>
                        <Text style={styles.userInfoSubTitle}>Followers</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>227</Text>
                        <Text style={styles.userInfoSubTitle}>Following</Text>
                    </View>
                </View>
                {
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