import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
//import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import profileStore from "../../stores/profileStore";
import { Button } from "native-base";

function Profile() {
  //const navigation = useNavigation();
  if (profileStore.isLoading) return <Text>Loading</Text>;
  //   let user = userStore.user;
  const userID = "62c28f730d74ef71cdc30f82";
  let profile = profileStore.getProfileById(userID);
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
                //   navigation.navigate("EditProfile");
              }}
            >
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={24}
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
    </View>
  );
}
export default observer(Profile);
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    height: "100%",
  },
  profileItems: {
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
  },
  bio: {
    fontSize: 15,
    color: "#A09C9A",
    fontWeight: "300",
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
    borderWidth: 1,
    marginTop: 220,
    borderColor: "#A09C9A",
    width: 330,
    right: -120,
  },
  EditBtn: {
    position: "absolute",
    left: 180,
    width: 50,
    borderRadius: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
