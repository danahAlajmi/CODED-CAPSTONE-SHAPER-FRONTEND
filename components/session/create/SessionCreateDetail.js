import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';


export function SessionCreateDetail({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nop, setNop] = useState(0);
  const [showError, setShowError] = useState(false);
const [loaded] = useFonts({
  'UbuntuBold': require('../../../assets/fonts/Ubuntu-Bold.ttf'),
  'UbuntuLight': require('../../../assets/fonts/Ubuntu-Light.ttf'),
  'Ubuntu': require('../../../assets/fonts/Ubuntu-Regular.ttf'),
});

if (!loaded) {
  return null;
}


  const handleNext = () => {
    if(name=== "" || description=== "" || nop===0){
      setShowError(true)
    }
    else{
    let session = {
      title: name,
      description: description,
      limit: nop,
    };
    navigation.navigate("SessionCreateLocation", { session });
  }
  };



  return (
<Root>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Session Name"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Session Description"
            placeholderTextColor="#003f5c"
            onChangeText={(description) => setDescription(description)}
          />
        </View>
        <View style={styles.NumImageView}>
          <View style={styles.inputNumberView}>
            <TextInput
              style={styles.TextInput}
              placeholder="No. Participants"
              placeholderTextColor="#003f5c"
              keyboardType="numeric"
              onChangeText={(nop) => setNop(+nop)}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.uploadImageBtn}>
              <AntDesign name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.SignUpBtn}>
        <Text style={styles.SignUpText}>Next</Text>
      </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    {showError ? (
          (Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Invalid",
            textBody:
              "Please fill out all the information",
            onShow: () => setShowError(false),
            onHide: () => setShowError(false)
          }))
        ) : (
          <></>
        )}
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent:"center",
    alignItems: "center",
    paddingBottom:"15%"
  },
  inputContainer: {
    alignItems: "center",
  },
  NumImageView: {
    flexDirection: "row",
    marginTop: "8%",
  },
  inputView: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    width: "90%",
    minWidth: "70%",
    maxWidth: "70%",
    height: 45,
    marginBottom: 20,
    marginTop: "8%",
  },
  inputNumberView: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    width: "40%",
    minWidth: "40%",
    maxWidth: "40%",
    height: 45,
    marginBottom: 20,
    marginRight: 40,
  },
  uploadImageBtn: {
    backgroundColor: "#FFA90D",
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
  },
  SignUpText: {
    color: "white",
    fontFamily:"UbuntuBold",
    alignSelf: "center",
  },
});
