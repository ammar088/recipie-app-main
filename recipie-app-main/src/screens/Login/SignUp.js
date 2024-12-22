import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "../../components/Button/TextField";
import PasswordField from "../../components/Button/PasswordField";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User created successfully:", userCredential.user);
        alert("Sign-up successful! You can now log in.");
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        console.error("Sign-up error:", error.message);
        alert(error.message);
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
          <TextField place={"E-mail"} change={handleEmailChange} />
        </View>
        <PasswordField change={handlePasswordChange} place={"Password"} />
        <TouchableOpacity style={styles.passwordHint}>
          <Text style={styles.passwordHintText}>
            Password must be 6+ characters
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginRedirect}
          onPress={() => {
            navigation.navigate("Welcome");
          }}
        >
          <Text style={styles.loginRedirectText}>
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 30,
    marginBottom: 50,
    width: "68%",
    height: 250,
    borderRadius: 10,
  },
  textFieldContainer: {
    width: "100%",
    marginBottom: 50,
  },
  passwordHint: {
    marginTop: 20,
  },
  passwordHintText: {
    color: "grey",
    fontSize: 12,
    marginLeft: 180,
  },
  signupButton: {
    backgroundColor: "transparent",
    width: "80%",
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    borderWidth: 2,
    borderColor: "aquamarine",
  },
  signupButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  loginRedirect: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginRedirectText: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 15,
  },
});
