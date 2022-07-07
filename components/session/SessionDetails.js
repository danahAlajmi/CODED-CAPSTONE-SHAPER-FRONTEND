import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import sessionStore from "../../stores/sessionStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import profileStore from "../../stores/profileStore";
export default function SessionDetails() {
  //   console.log(sessionStore.sessions);
  const session = sessionStore.sessions[0];
  let profile = profileStore.getProfileById(session.trainer);

  console.log(profile);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={styles.imageContainer}
          source={{ uri: session.image }}
        />
        <View style={styles.trainerInfo}>
          <Image style={styles.imagePro} source={{ uri: profile.image }} />
          <Text style={styles.trainerName}>
            {profile.firstName} {profile.lastName}
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.textCard}>
            <Text style={styles.title}>{session.title}</Text>
            <Text style={styles.description}>{session.description}</Text>
            <Text style={styles.datePrice}>
              {/* <MaterialCommunityIcons
                name="timetable"
                size={24}
                color="black"
              /> */}
              🗓️ 12:00PM - 7/7/2022
            </Text>
            <Text style={styles.duration}>
              {/* <MaterialCommunityIcons
                name="timer-settings-outline"
                size={24}
                color="black"
              /> */}
              ⏳ {session.duration} Min
            </Text>
            <Text style={styles.datePrice}>💰 10KD</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Join</Text>
            </TouchableOpacity>
            <Text style={styles.location}>Location</Text>
            <View>
              <Text style={styles.partiText}>participants</Text>
              <Text style={styles.parti}>
                {session.participants.length}/{session.limit}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    // marginTop: 5,
  },
  imageContainer: {
    height: 300,
    width: "100%",
  },
  card: {
    justifyContent: "flex-start",
    borderRadius: 50,
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    top: 250,
  },
  textCard: {
    marginHorizontal: 15,
    // marginVertical: 30,
  },
  title: {
    marginTop: 10,
    fontSize: 40,
  },
  description: {
    fontSize: 20,
    marginTop: 10,
  },
  datePrice: {
    fontSize: 20,
    marginTop: 20,
    color: "#FFA90D",
  },
  duration: {
    flexDirection: "row",
    fontSize: 20,
    marginTop: 20,
    color: "#FFA90D",
  },
  btn: {
    // alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
    // marginTop: 30,
    marginHorizontal: 40,
    // backgroundColor: "#FFA90D",
    width: 300,
    // height: 55,
    // borderRadius: 10,
    minWidth: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.0,

    elevation: 3,
  },
  btnText: {
    fontSize: 25,
    textAlign: "center",
  },
  location: {
    marginTop: 20,
    fontSize: 20,
  },
  parti: {
    textAlign: "right",
    fontSize: 17,
  },
  partiText: {
    textAlign: "left",
    fontSize: 20,
  },
  trainerInfo: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: 90,
    flexDirection: "row",
    // marginTop: 20,
  },
  imagePro: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 30,
    marginHorizontal: 10,
  },
  trainerName: {
    fontSize: 25,
    color: "white",
    marginTop: 40,
    // marginHorizontal: 5,
  },
});
