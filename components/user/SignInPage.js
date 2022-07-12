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
import { useFonts } from 'expo-font';

export function SignInPage({ navigation }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorin, setShowErrorin] = useState(false);
  const [loaded] = useFonts({
    'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const handleSignin = () => {
    let user = {
      username: userName,
      password: password,
    };
    userStore.signin(user,setShowErrorin);
  };
  
  const handleSignUp = () => {
    navigation.navigate("Signup")
  }

  return (
<Root>
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
        <TouchableOpacity onPress={handleSignUp}><Text style={{marginTop:20, fontFamily:"UbuntuBold"}}>Sign up<Text style={{color:"#FFA90D",fontFamily:"UbuntuBold"}}> Here</Text></Text></TouchableOpacity>
        </View>

        {showErrorin ? (
          (Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Wrong Information",
            textBody:
              "Username and password combination is incorrect, please try again.",
          }),
          setShowErrorin(false))
        ) : (
          <></>
        )}
      </View>
      </Root>
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
    fontFamily:"UbuntuLight",
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
    fontFamily:"UbuntuBold",
    alignSelf: "center",
  },
  signUpContainer:{

  },
  askText: {
    marginTop:40,
    color: "black",
    fontSize: 16,
    fontFamily:"UbuntuBold"
  },
});
