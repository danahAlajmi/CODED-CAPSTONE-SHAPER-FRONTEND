import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { useState } from "react";
import userStore from "../../stores/userStore";
import profileStore from "../../stores/profileStore";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from 'expo-font';

let imageUri = null;

export function CreateProfile({ route }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [profileError, showProfileError] = useState(false);
  const [loaded] = useFonts({
    'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }


  const handleCreateProfile = () => {
    let profile = null;
    // const user = route.params
    if (imageUri !== null) {
      profile = {
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        image: imageUri,
      };
    } else {
      profile = {
        firstName: firstName,
        lastName: lastName,
        bio: bio,
      };
    }
    profileStore.updateProfile(profile,userStore.profile,showProfileError)
    userStore.checkForToken()
  };
  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    const file = await FileSystem.uploadAsync(
      "http://192.168.100.151:8090/api/profile/image-upload",
      result.uri
    );
    imageUri = file.body;
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      >
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/appBackground2.png")}
        style={styles.backgroundImage}
      />

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleUpload}>
          <Image
            style={styles.image}
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            }}
          />

          <View style={styles.imageOverlay} />
          <AntDesign
            name="camera"
            size={24}
            color="white"
            style={{ marginTop: 60, marginLeft: 53 }}
          />
        </TouchableOpacity>
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
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 140,
    width: 130,
    borderRadius: 10,
  },
  image: {
    height: 140,
    width: 130,
    borderRadius: 10,
    position: "absolute",
    overflow: "hidden",
  },
  imageOverlay: {
    height: 140,
    width: 130,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    ...StyleSheet.absoluteFill,
  },
  inputContainer: {
    marginTop: "40%",
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    minWidth: "70%",
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
  SignUpBtn: {
    minWidth: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.0,

    elevation: 3,
  },
  SignUpText: {
    color: "#FFA90D",
    fontFamily:"UbuntuBold",
    alignSelf: "center",

  },
});
