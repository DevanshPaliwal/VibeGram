import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { LogBox } from 'react-native';


// const Next=({...props})=>(
//     <Button 
//     title='Next'
//     {...props}
//      />
// )

const Done = ({ ...props }) => (
    <TouchableOpacity {...props}>
        <Text style={{ padding: 18, fontSize: 17, color: 'black' }}>Done</Text>
        
    </TouchableOpacity>
)
const OnboardingScreen = ({ navigation }) => {
    LogBox.ignoreAllLogs();
    return (
        <Onboarding
            DoneButtonComponent={Done}
            // NextButtonComponent={Next}
            onSkip={() => navigation.navigate("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../assets/onboarding-img1.png')} />,
                    title: 'Connect with the world',
                    subtitle: 'A new way to connect',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../assets/onboarding-img2.png')} />,
                    title: 'Share your thoughts',
                    subtitle: 'Connect with similar kind of people',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../assets/onboarding-img3.png')} />,
                    title: 'Become a star',
                    subtitle: 'Let the spotlight capture you',
                }
            ]}
        />
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})