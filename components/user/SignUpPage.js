import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import userStore from "../../stores/userStore";
import RadioForm from 'react-native-simple-radio-button';


export function SignUpPage({ navigation }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isTrainer, setIsTrainer] = useState(false)
  const radio_props = [
    {label: 'Trainee', value: false },
    {label: 'Trainer', value: true }
  ];

  const handleSignUp = () => {
    let user = {
      username: userName,
      password: password,
      email: email,
      isTrainer: isTrainer,
    };

    navigation.navigate("CreateProfile",{user})
  };

  return (
<View style={styles.container}>
        <ImageBackground
          source={require("../../assets/appBackground1.png")}
          style={styles.backgroundImage}
        />

        <View style={styles.inputContainer}>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Email Address"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

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
        </View>
        <TouchableOpacity onPress={handleSignUp} style={styles.NextBtn}>
          <Text style={styles.NextText}>Next</Text>
        </TouchableOpacity>

        <View style={styles.radioButtonContainer}>
        <RadioForm
          radio_props={radio_props}
          initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            animation={true}
            buttonColor={'#FFA90D'}
            selectedButtonColor={'#FFA90D'}
            style={{padding:30,}}
            radioStyle={{paddingRight: 40,paddingLeft: 30}}
            onPress={(value) => {setIsTrainer(value)}}
        />
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
    marginTop:"40%"
  },
  inputView: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    width: "90%",
    minWidth:"70%",
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
  NextBtn: {
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
  NextText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },

  radioButtonContainer:{
    textAlign: "center",
    justifyContent: "space-between"
  }
});
