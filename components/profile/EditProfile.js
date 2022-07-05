import React from "react";
import profileStore from "../../stores/profileStore";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react";
import { Card } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";
function EditProfile() {
  if (profileStore.isLoading) return <Text>Loading</Text>;
  //   let user = userStore.user;
  const userID = "62c28f730d74ef71cdc30f82";
  let profile = profileStore.getProfileById(userID);
  // console.log(profile);
  const [bio, onChangeBio] = useState(profile.bio);
  const [image, onChangeImage] = useState(profile.image);
  const [firstName, onChangeFirstName] = useState(profile.firstName);
  const [lastName, onChangeLastName] = useState(profile.lastName);

  // const handleUpload = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync();
  //   // onChangeImage(result.uri);
  //   // console.log(image)
  //   const file = await FileSystem.uploadAsync('http://192.168.150.146:8095/api/trips/trip-image',result.uri);
  //   // console.log(file.body)
  //   imageUri = file.body;
  //   // console.log(imageUri)
  // }

  const handleSubmit = () => {
    const update = {
      bio: bio,
      image: imageUri,
      firstName: firstName,
      lastName: lastName,
    };
    profileStore.updateProfile(update, profile._id);
    navigation.navigate("Profile");
  };

  const handleClear = () => {
    onChangeBio("");
    onChangeImage("");
    onChangeFirstName("");
    onChangeLastName("");
  };
  if (profileStore.isLoading) return <Text>Loading</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card containerStyle={styles.cardContainer}>
          <View style={{ flexDirection: "row" }}>
            {/* <Card.Title>Edit Your Profile</Card.Title> */}
            <TouchableOpacity style={styles.cancleBtn} onPress={handleClear}>
              <Text style={styles.btnText}>Cancle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={() => {
                //   navigation.navigate("EditProfile");
              }}
            ></TouchableOpacity>
            <Text style={styles.imageText}>Change profile photo</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 40 }}>
            <Card.Title style={styles.text}>First Name</Card.Title>
            <View style={styles.textContainer}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeFirstName}
                value={firstName}
                placeholder={profile.firstName}
              />
              <Card.Divider style={styles.divider} />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Card.Title style={styles.text}>Last Name</Card.Title>
            <View style={{ marginLeft: 22 }}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeLastName}
                value={lastName}
                placeholder={profile.lastName}
              />
              <Card.Divider style={styles.divider} />
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Card.Title style={styles.text}>Bio</Card.Title>
            <View style={{ marginLeft: 76 }}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeBio}
                value={bio}
                placeholder={profile.bio}
              />
              <Card.Divider style={styles.divider} />
            </View>
          </View>
          {/* <Card.Title>Image</Card.Title>
          <Button title="Upload" color="#199EF3" /> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 30,
            }}
          >
            <TouchableOpacity style={styles.doneBtn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Done</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.cancleBtn} onPress={handleClear}>
              <Text style={styles.btnText}>Cancle</Text>
            </TouchableOpacity> */}
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  cardContainer: {
    borderWidth: 0, // Remove Border

    shadowColor: "rgba(0,0,0, 0.0)", // Remove Shadow for iOS
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0, // Remove Shadow for Android
  },
  input: {
    height: 20,
    marginLeft: 10,
    borderWidth: 0,
    borderColor: "#6FB6F6",
    textAlign: "justify",
  },
  divider: {
    width: 250,
  },
  textContainer: {
    marginLeft: 20,
  },
  text: {
    textAlign: "justify",
    fontSize: 15,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  imageViewContainer: {
    backgroundColor: "gray",
    height: 140,
    width: 130,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageText: {
    color: "#6FB6F6",
  },
  doneBtn: {
    marginTop: 10,
    width: 90,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cancleBtn: {
    // marginLeft: 160,
    //marginTop: 10,
    alignItems: "flex-start",
    width: 90,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
export default observer(EditProfile);
