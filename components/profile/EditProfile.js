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
  const [bio, onChangeBio] = useState();
  const [image, onChangeImage] = useState();
  if (profileStore.isLoading) return <Text>Loading</Text>;
  //   let user = userStore.user;
  const userID = "62c28f730d74ef71cdc30f82";
  let profile = profileStore.getProfileById(userID);
  // console.log(profile);

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
    const update = { bio: bio, image: imageUri };
    profileStore.updateProfile(update, profile._id);
    navigation.navigate("Profile");
  };

  const handleClear = () => {
    onChangeBio("");
    onChangeImage("");
  };
  if (profileStore.isLoading) return <Text>Loading</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Edit Your Profile</Card.Title>
          <Card.Divider />
          <View style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={() => {
                //   navigation.navigate("EditProfile");
              }}
            ></TouchableOpacity>
          </View>
          <Card.Divider />
          <View style={{ flexDirection: "row" }}>
            <Card.Title style={styles.text}>First Name</Card.Title>
            <TextInput
              style={styles.input}
              onChangeText={onChangeBio}
              value={bio}
              placeholder={profile.firstName}
            />
          </View>
          <Card.Divider />
          <View style={{ flexDirection: "row" }}>
            <Card.Title style={styles.text}>Last Name</Card.Title>
            <TextInput
              style={styles.input}
              onChangeText={onChangeBio}
              value={bio}
              placeholder={profile.lastName}
            />
          </View>
          <Card.Divider />
          <View style={{ flexDirection: "row" }}>
            <Card.Title style={styles.text}>Bio</Card.Title>
            <TextInput
              style={styles.input}
              onChangeText={onChangeBio}
              value={bio}
              placeholder={profile.bio}
            />
          </View>
          <Card.Divider />
          {/* <Card.Title>Image</Card.Title>
          <Button title="Upload" color="#199EF3" /> */}
          <View>
            <Button title="Done" color="#6FB6F6" onPress={handleSubmit} />
            <Divider />
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 20,
              }}
            />
            <Button color="#C6C9CC" title="Clear" onPress={handleClear} />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    // height: 500,
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
  },
  text: {
    textAlign: "left",
  },
  imageContainer: {
    alignItems: "center",
  },
  imageViewContainer: {
    backgroundColor: "gray",
    height: 140,
    width: 130,
    borderRadius: 10,
    marginBottom: 20,
  },
});
export default observer(EditProfile);
