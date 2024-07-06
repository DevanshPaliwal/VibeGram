import React, { createContext, useState } from 'react'
import auth, { firebase } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'



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
                    }
                    catch (e) {
                        console.log(e)
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
                    catch(e){
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