import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import Button from '../../components/Button/Button';

export default function Login({ navigation }) {
    return (
        <ImageBackground 
            source={require("../../../assets/wallpaper-1.png")} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text}>Receptoria</Text> 
                    <Image 
                        style={styles.logo} 
                        source={require("../../../assets/korean (2).png")} 
                    />
                    <Text style={styles.welcomeText}>Welcome!</Text> 
                    <Text style={styles.subText}>Come join us now</Text> 
                    <Text style={styles.subText}>Create an account or login</Text>
                </View>
                
                <TouchableOpacity 
                    style={styles.loginButton} 
                    onPress={() => navigation.navigate("Welcome")}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                
                <Button 
                    name={'Sign up'} 
                    navigat={() => navigation.navigate("signup")} 
                />
                
                <Text style={styles.footerText}>Create an account or login</Text>
                <StatusBar style="auto" />
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
    header: {
        flex: 0.7,
        marginBottom: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
        marginLeft: "auto",
        marginRight:"auto",
        fontStyle: 'italic',
        color: 'black',
        marginBottom: 5,
    },
    logo: {
        marginTop: 10,
        width: 250,
        height: 230,
        borderRadius: 10,
    },
    welcomeText: {
        marginLeft: 10,
        fontSize: 19,
        fontWeight: 'bold',
    },
    subText: {
        marginLeft: 10,
        fontSize: 15,
        color: 'grey',
        marginTop: 5,
    },
    loginButton: {
        backgroundColor: "transparent",
        width: "70%",
        height: 60,
        marginBottom: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'aquamarine',
        borderWidth: 2,
    },
    loginButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    footerText: {
        marginLeft: 10,
        fontSize: 12,
        color: 'black',
        marginTop: 30,
    },
});
