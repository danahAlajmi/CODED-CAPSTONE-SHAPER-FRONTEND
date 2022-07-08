import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
//import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import profileStore from "../../stores/profileStore";

function ProfileUserView({route}) {
  const trainer = route.params.trainer;
  if (profileStore.isLoading) return <Text>Loading</Text>;
  let profile = profileStore.getProfileById(trainer._id);
  return (
    <SafeAreaView style={styles.containerSaveView}>
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
            </View>
            <Text style={styles.bio}>{profile.bio}</Text>
            <View style={styles.containerNumOfHOurs}>
              <Text style={styles.number}>
                {profileStore.getNumOfHours(profile._id)}{" "}
              </Text>
              <Text> Hours 🏋️</Text>
            </View>
          </View>
        </View>
        <View style={styles.border} />
        <View>
          <Text style={styles.sessionText}>Sissions</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default observer(ProfileUserView);
const styles = StyleSheet.create({
  containerSaveView: {
    backgroundColor: "white",
    height: "100%",
    // marginTop: 10,
  },
  container: {
    // position: "absolute",
    // flex: 1,
    // // paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    height: "100%",
  },
  profileItems: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 20,
    marginLeft: 20,
    // display: "flex",
  },
  image: {
    height: 140,
    width: 120,
    maxHeight: 140,
    maxWidth: 120,
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
    // position: "absolute",
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center",
    borderWidth: 0.5,
    marginTop: 30,
    borderColor: "#A09C9A",
    width: 350,
    // top: 200,
    right: -30,
    marginBottom: 25,
  },
  EditBtn: {
    // position: "absolute",
    left: 130,
    // top: -5,
    // width: 50,
    // borderRadius: 50,
    // height: 50,
    // alignItems: "flex-end",
    //justifyContent: "space-between",
  },
  sessionText: {
    // flex: 1,
    fontSize: 18,
    marginLeft: 20,
    // marginTop: -650,
    // right: 110,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
});
