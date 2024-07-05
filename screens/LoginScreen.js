import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../navigation/AuthProvider";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const {login} = useContext(AuthContext)

    return (
        <View style={styles.container} >
            <Image source={require('../assets/VibeGram/logo-transparent-png.png')}
                style={styles.logo} />

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText='Email'
                iconType='person'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText='Password'
                iconType='lock'
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle='Sign In'
                onPress={() => login(email,password)}
            />

            <TouchableOpacity onPress={() => { }} style={styles.forgotButton}>
                <Text style={styles.navButtonText}>Forgot password?</Text>
            </TouchableOpacity>

            <SocialButton
                buttonTitle='Sign in with Google'
                color='#de4d41'
                backgroundColor='#f5e7ea'
                onPress={() => { }}
                btnType='google'
            />
            <View style={styles.viewText}>
                <Text style={[styles.navButtonText,{color:'black'}]} >
                    Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.navButtonText}> Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'cover',
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 35,
    },
    forgotButton: {
        marginVertical: 18,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    viewText: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },

})