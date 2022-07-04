import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import userStore from "../../stores/userStore";
import profileStore from "../../stores/profileStore";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";


export function CreateProfile({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("")
    // no image upload at the moment
  const handleCreateProfile = () => {
    let profile = {
        firstName: firstName,
        lastName: lastName,
        bio: bio,
      };
      profileStore.updateProfile(profile,userStore.user.profile)
  };

  return (
<View style={styles.container}>
        <ImageBackground
          source={require("../../assets/appBackground2.png")}
          style={styles.backgroundImage}
        />

        <View>
            <TouchableOpacity><Text>Here</Text></TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter First Name"
            placeholderTextColor="#003f5c"
            onChangeText={(firstName) => setFirstName(firstName)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Last Name"
            placeholderTextColor="#003f5c"
            onChangeText={(lastName) => setLastName(lastName)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter A Short Bio"
            placeholderTextColor="#003f5c"
            onChangeText={(bio) => setBio(bio)}
          />
        </View>
        </View>
        <TouchableOpacity onPress={handleCreateProfile} style={styles.SignUpBtn}>
          <Text style={styles.SignUpText}>Sign Up</Text>
        </TouchableOpacity>

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
    marginTop:"60%"
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    minWidth:"70%",
    height: 45,
    marginBottom: 20,
    shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
  
      elevation: 4,
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
  SignUpBtn: {
    minWidth: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 4,
  },
  SignUpText: {
    color: "#FFA90D",
    fontWeight: "bold",
    alignSelf: "center",
    
  },
});
