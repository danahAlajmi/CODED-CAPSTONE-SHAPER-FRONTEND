import React from "react";
import profileStore from "../../stores/profileStore";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react";
import { Card } from "react-native-elements";
import userStore from "../../stores/userStore";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import Profile from "./Profile";

let imageUri = null;

function EditProfile() {
  if (profileStore.isLoading) return <Text>Loading</Text>;
  let user = userStore.user;
  let profile = profileStore.getProfileById(user._id);

  const [bio, onChangeBio] = useState(profile.bio);
  const [image, onChangeImage] = useState(profile.image);
  const [firstName, onChangeFirstName] = useState(profile.firstName);
  const [lastName, onChangeLastName] = useState(profile.lastName);
  const [edited, showEdited] = useState(true);

  const navigation = useNavigation();

  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    const file = await FileSystem.uploadAsync(
      "http://192.168.1.5:8090/api/profile/image-upload",
      result.uri
    );
    imageUri = file.body;
  };


  const handleSubmit = () => {
    const update = {
      bio: bio,
      image: image,
      firstName: firstName,
      lastName: lastName,
    };
    profileStore.updateProfile(update, profile._id,showEdited);
  };
  
  const handleCancel = () => {
    navigation.navigate("Profile");
  };

  return (
    <Root>
    <SafeAreaView style={styles.containerSaveView}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancleText}>Cancel</Text>
            </TouchableOpacity>
            <Card.Title style={{ fontSize: 17 }}>Edit Your Profile</Card.Title>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <Card.Divider />

          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleUpload}>
              <Image
                style={styles.image}
                source={{
                  uri: image,
                }}
              />

              <View style={styles.imageOverlay} />
              <AntDesign
                name="camera"
                size={24}
                color="black"
                style={{ marginTop: 40, marginLeft: 38 }}
              />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.imageViewContainer}
              onPress={handleUpload}
            ></TouchableOpacity>
            <Text style={styles.imageText}>Change profile photo</Text>
          </View> */}
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
            {/* <TouchableOpacity style={styles.cancleBtn} onPress={handleClear}>
              <Text style={styles.btnText}>Cancle</Text>
            </TouchableOpacity> */}
          </View>
        </Card>
      </View>
    </SafeAreaView>
        {!edited ? (
          (Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Profile Edited",
            textBody:
              "Profile Edited Successfuly",
              button: "To Profile",
            onPressButton: () => { 
              navigation.navigate("Profile");
              showEdited(false)
            },
            onHide : () => {
              navigation.navigate("Profile");
            }
          })
          )
        ) : (
          <></>
        )}
    </Root>
  );
}
export default observer(EditProfile);

const styles = StyleSheet.create({
  containerSaveView: {
    backgroundColor: "white",
    height: "100%",
    // marginTop: 10,
  },
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
  // doneBtn: {
  //   marginTop: 10,
  //   width: 90,
  //   borderRadius: 10,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "#FFA90D",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 5,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 10,
  // },
  // cancleBtn: {
  //   // marginLeft: 160,
  //   //marginTop: 10,
  //   alignItems: "flex-start",
  //   width: 90,
  //   borderRadius: 10,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   color: "black",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 5,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 10,
  // },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancleText: {
    color: "#A09C9A",
    fontSize: 17,
  },
  doneText: {
    color: "#0D99FF",
    fontSize: 17,
  },
});
