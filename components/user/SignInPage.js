import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  Button,
} from "react-native";
import { useState } from "react";
import userStore from "../../stores/userStore";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';

export function SignInPage({ navigation }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    let user = {
      username: userName,
      password: password,
    };
    userStore.signin(user);
  };
  
  const handleSignUp = () => {
    navigation.navigate("Signup")
  }

  return (
<View style={styles.container}>
<ImageBackground
          source={require("../../assets/appBackground1.png")}
          style={styles.backgroundImage}
        />


        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Username"
            placeholderTextColor="#003f5c"
            onChangeText={(userName) => setUsername(userName)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Passsword"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity onPress={handleSignin} style={styles.signinBtn}>
          <Text style={styles.signinText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.askText}>Don't have an account?</Text>
        <View stylle={styles.signUpContainer}>
        <TouchableOpacity onPress={handleSignUp}><Text style={{marginTop:20, fontWeight:"bold"}}>Sign up<Text style={{color:"#FFA90D"}}> Here</Text></Text></TouchableOpacity>
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer:{
    marginTop:"0%"
  },
  inputView: {
    marginTop:"10%",
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    maxWidth: "90%",
    minWidth:"75%",
    height: 45,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.0,

    elevation: 3,
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  signinBtn: {
    minWidth: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.0,

    elevation: 3,
  },
  signinText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  signUpContainer:{

  },
  askText: {
    marginTop:40,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",

  },
});
