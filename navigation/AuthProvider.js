import React, { createContext, useState } from 'react'
import auth, { firebase } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
import firestore from '@react-native-firebase/firestore'



export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                firestore().collection('users').doc(auth().currentUser.uid)
                                    .set({
                                        fname: '',
                                        lname: '',
                                        email: email,
                                        createdAt: firestore.Timestamp.fromDate(new Date()),
                                        userImg: null,
                                    })
                                    .catch(error => {
                                        console.log("something went wrong with added user: ", error)
                                    })
                            })
                            .catch(error => {
                                console.log("Something went wrong with signup: ", error)
                            })
                    }
                    catch (e) {
                        console.log(e)
                    }
                },
                googleSignup: async () => {
                    try {
                        const { idToken } = await GoogleSignin.signIn()

                        const googleCredential = auth.GoogleAuthProvider.credential(idToken)

                        await auth().signInWithCredential(googleCredential)

                            .then(() => {
                                //Once the user creation has happened successfully, we can add the currentUser into firestore
                                //with the appropriate details.
                                // console.log('current User', auth().currentUser);
                                firestore().collection('users').doc(auth().currentUser.uid)
                                    .set({
                                        fname: '',
                                        lname: '',
                                        email: auth().currentUser.email,
                                        createdAt: firestore.Timestamp.fromDate(new Date()),
                                        userImg: null,
                                    })
                                    //ensure we catch any errors at this stage to advise us if something does go wrong
                                    .catch(error => {
                                        console.log('Something went wrong with added user to firestore: ', error);
                                    })
                            })

                            .catch(error => {
                                console.log('Something went wrong with sign up: ', error);
                            });
                    } catch (error) {
                        console.log({ error });
                    }
                },
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                    }
                    catch (e) {
                        console.log(e);
                    }
                },
                googleLogin: async () => {
                    try {
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential);
                    }
                    catch (e) {
                        console.log(e)
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut()
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
            }}

        >
            {children}
        </AuthContext.Provider>
    )
}