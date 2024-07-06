import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native'
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../navigation/AuthProvider";


const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const { register } = useContext(AuthContext)

    return (
        <View style={styles.container} >
            <Text style={styles.text}>Create an account</Text>
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

            <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText='Confirm Password'
                iconType='lock'
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle='Sign Up'
                onPress={() => register(email, password)}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>By signing up, you confirm that you accept our </Text>
                <TouchableOpacity onPress={() => console.log('Terms of service')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Terms of Service</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Privacy Policy</Text>

            </View>

            {Platform.OS === 'android' ? (
                <SocialButton
                    buttonTitle='Sign up with Google'
                    color='#de4d41'
                    backgroundColor='#f5e7ea'
                    onPress={() => { }}
                    btnType='google'
                />
            ) : null
            }

            <View style={styles.viewText}>
                <Text style={[styles.navButtonText, { color: 'black' }]}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.forgotButton}>
                    <Text style={styles.navButtonText}> Sign in</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
    },
    viewText: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },

})