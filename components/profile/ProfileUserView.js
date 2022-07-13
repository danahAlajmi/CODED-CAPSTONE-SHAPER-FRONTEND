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

import { observer } from "mobx-react";
import profileStore from "../../stores/profileStore";
import ProfileSessionItem from "../profile/ProfileSessionItem";
import { useFonts } from "expo-font";

function ProfileUserView({ route }) {
  const [loaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const trainer = route.params.trainer;
  if (profileStore.isLoading) return <Text>Loading</Text>;
  let profile = profileStore.getProfileById(trainer._id);

  const sessionsList = profile.user?.enrolled?.map((session) => {
    return <ProfileSessionItem key={session} session={session} />;
  });
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
                {profileStore.getNumOfHours(trainer._id)}{" "}
              </Text>
              <Text> Hours 🏋️</Text>
            </View>
          </View>
        </View>
        <View style={styles.border} />
        <View>
          <Text style={styles.sessionText}>Sessions</Text>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            alignItems="center"
            style={styles.scrollView}
          >
            {sessionsList}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default observer(ProfileUserView);
const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
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
    marginTop: 10,
    //css from app.js
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  profileItems: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
    // display: "flex",
  },
  image: {
    height: 140,
    width: 120,
    borderRadius: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    // marginTop:
    // paddingVertical: 10,
  },
  profileName: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "600",
    fontFamily: "UbuntuBold",
    maxWidth: 120,
    overflow: "hidden",
  },
  bio: {
    fontSize: 15,
    color: "#A09C9A",
    fontWeight: "300",
    fontFamily: "UbuntuLight",
  },
  number: {
    color: "#FFA90D",
    fontSize: 15,
    fontWeight: "300",
    fontFamily: "Ubuntu",
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
    borderWidth: 0.4,
    marginTop: 30,
    borderColor: "#D9D9D9",
    width: 360,
    // top: 200,
    right: -20,
    marginBottom: 25,
  },
  EditBtn: {
    left: 100,
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
    fontFamily: "Ubuntu",
    // marginTop: -650,
    // right: 110,
  },
});
