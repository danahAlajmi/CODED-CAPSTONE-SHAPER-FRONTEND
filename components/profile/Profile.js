import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import profileStore from "../../stores/profileStore";
import { Button } from "native-base";
import userStore from "../../stores/userStore";

function Profile() {
  const navigation = useNavigation();
  if (profileStore.isLoading) return <Text>Loading</Text>;
  let user = userStore.user;
  // Ali added this line to make sure upload works
  let profile = profileStore.getProfileById(user._id);
  // console.log(profile);
  return (
    <View style={styles.container}>
      <View style={styles.profileItems}>
        <Image
          style={styles.image}
          source={{
            uri: profile.image,
          }}
        />
        <View style={styles.textContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.profileName}>
              {profile.firstName} {profile.lastName}
            </Text>
            <TouchableOpacity
              style={styles.EditBtn}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.bio}>{profile.bio}</Text>
          <View style={styles.containerNumOfHOurs}>
            <Text style={styles.number}>15 </Text>
            <Text>Hours 🏋️</Text>
          </View>
        </View>
      </View>
      <View style={styles.border} />
      <View>
        <Text style={styles.sessionText}>Sissions</Text>
      </View>
    </View>
  );
}
export default observer(Profile);
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    height: "100%",
  },
  profileItems: {
    flex: 1,
    flexDirection: "row",
    marginTop: 50,
    marginLeft: -130,
    display: "flex",
  },
  image: {
    height: 140,
    width: 120,
    borderRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  profileName: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 2,
  },
  bio: {
    fontSize: 15,
    color: "#A09C9A",
    fontWeight: "300",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  number: {
    color: "#FFA90D",
    fontSize: 15,
    fontWeight: "300",
  },
  containerNumOfHOurs: {
    flexDirection: "row",
    marginTop: 50,
  },
  border: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginTop: 30,
    borderColor: "#A09C9A",
    width: 300,
    top: 200,
    right: -100,
    marginBottom: 25,
  },
  EditBtn: {
    position: "absolute",
    left: 180,
    top: -5,
    width: 50,
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sessionText: {
    flex: 1,
    fontSize: 18,
    marginTop: -650,
    right: 110,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
});
