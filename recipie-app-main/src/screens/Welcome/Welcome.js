import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import TextField from '../../components/Button/TextField';
import PasswordField from '../../components/Button/PasswordField';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Welcome({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const login = () => {
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("User signed in successfully.");
                navigation.navigate('HomeScreen');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`Error code: ${errorCode}`);
                console.log(`Error message: ${errorMessage}`);
                // Handle different error codes (e.g., invalid email, wrong password, etc.)
            });
    };
   
    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    return (
        <ImageBackground 
            source={require("../../../assets/wallpaper-1.png")} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Image 
                    style={styles.logo} 
                    source={require("../../../assets/cook.png")} 
                />
                
                <View style={styles.textFieldContainer}>
                    <TextField place={'E-mail'} change={handleEmailChange} />
                </View>

                <PasswordField change={handlePasswordChange} place={'Password'} />
                
                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forget password?</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.loginButton} 
                    onPress={login}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.signupContainer} 
                    onPress={() => navigation.navigate("signup")}
                >
                    <Text style={styles.signupText}>or Signup with</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.newUserContainer}>
                    <Text style={styles.newUserText}>New on Receptoria? Signup now</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: 30,
        marginBottom: 50,
        width: '68%',
        height: 250,
        borderRadius: 10,
    },
    textFieldContainer: {
        width: '100%',
        marginBottom: 50,
    },
    forgotPassword: {
        marginTop: 20,
    },
    forgotPasswordText: {
        color: 'grey',
        fontSize: 12,
        marginLeft: 180,
    },
    loginButton: {
        backgroundColor: "transparent",
        width: "80%",
        height: 60,
        marginBottom: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        borderWidth: 2,
        borderColor: 'aquamarine',
    },
    loginButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    signupContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 15,
    },
    newUserContainer: {
        flex: 0.7,
        justifyContent: 'flex-end',
        alignItems: 'baseline',
    },
    newUserText: {
        color: 'grey',
        fontSize: 15,
    },
});
