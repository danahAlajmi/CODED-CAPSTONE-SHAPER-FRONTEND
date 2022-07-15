import { StatusBar } from "expo-status-bar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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

import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import profileStore from "../../stores/profileStore";
import { useFonts } from "expo-font";
import ProfileSessionLTraining from "./ProfileSessionLTraining";
import ProfileSessionLEnrolled from "./ProfileSessionLEnrolled";
import userStore from "../../stores/userStore";
const Tab = createMaterialTopTabNavigator();
function ProfileUserView({ route }) {
  const [loaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  const navigation = useNavigation();
  if (!loaded) {
    return null;
  }
  if (profileStore.isLoading) return <Text>Loading</Text>;

  const user = userStore.getUserById(route.params);
  let profile = profileStore.getProfileById(user._id);

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
                {profileStore.getNumOfHours(user._id)}{" "}
              </Text>
              <Text> Hours 🏋️</Text>
            </View>
          </View>
        </View>
        <View style={styles.border} />
        <View
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          {user.isTrainer ? (
            <Tab.Navigator
              screenOptions={{
                tabBarContentContainerStyle: {},
                tabBarIndicatorStyle: { backgroundColor: "#FFA90D" },
                tabBarLabelStyle: { fontFamily: "UbuntuBold" },
              }}
            >
              <Tab.Screen
                name="Training"
                children={() => <ProfileSessionLTraining id={user._id} />}
              />
              <Tab.Screen
                name="Enrolled"
                children={() => <ProfileSessionLEnrolled id={user._id} />}
              />
            </Tab.Navigator>
          ) : (
            <ProfileSessionLEnrolled id={user._id} />
          )}
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
