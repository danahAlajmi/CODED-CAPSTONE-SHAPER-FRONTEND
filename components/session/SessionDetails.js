import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { observer } from "mobx-react";
import React from "react";
import sessionStore from "../../stores/sessionStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import profileStore from "../../stores/profileStore";
import ParticipantInfo from "./ParticipantInfo";
import userStore from "../../stores/userStore";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

function SessionDetails({ route }) {
  const [visible, setVisible] = useState(false);
  const [isEnroll, setIsEnroll] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation();
  let user = userStore.user;
  const session = route.params;
  // console.log(session);
  // const participantsList = session.participants.map((participant) => {
  //   return <ParticipantInfo key={participant} participant={participant} />;
  // });
  let profile = profileStore.getProfileById(session.trainer);
  let signedUserProfile = profileStore.getProfileById(user._id);
  const refr = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  const handleJoin = () => {
    sessionStore.joinSession(session._id, user._id);
    setIsEnroll(true);
    refr;
    // console.log(session.participants);
    navigation.navigate("SuccessJoin", { session });
  };
  const handleCancel = () => {
    sessionStore.cancelSession(session._id, user._id);
    setIsEnroll(false);
    refr;
    // console.log(session.participants);
    navigation.navigate("SuccessCancel", { session });
  };
  // console.log(signedUserProfile.user.enrolled);
  let isEnrolled = session.participants.some((patricipent) => {
    user;
    if (user._id == patricipent) {
      return true;
    } else {
      return false;
    }
  });
  // let isEnrolled = signedUserProfile.user.enrolled.some((sessionId) => {
  //   // return session._id == sessionId;
  //   if (session._id == sessionId) {
  //     // setIsEnroll(true);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  // isEnrolled = isEnrolled[0];
  // console.log(isEnrolled, isEnroll);

  const handleEdit = () => {
    hideMenu();
    navigation.navigate("SessionEditDetail", { session });
  };

  const handleDelete = () => {
    hideMenu();
    sessionStore.DeleteSession(session, session._id);
    navigation.navigate("Explore");
  };
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const participantsList = session.participants.map((participant) => {
    return <ParticipantInfo key={participant} participant={participant} />;
  });
  return (
    <View style={styles.container}>
      {/* <Image style={styles.imageContainer} source={{ uri: session.image }} />
      <View style={styles.trainerInfo}>
        <Image style={styles.imagePro} source={{ uri: profile.image }} />
        <Text style={styles.trainerName}>
          {profile.firstName} {profile.lastName}
        </Text>
      </View> */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 800 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // style={{ backgroundColor: "transparent" }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => refr()} />
        }
      >
        <ImageBackground
          style={styles.imageContainer}
          source={{ uri: session.image }}
        />
        <View style={styles.trainerInfo}>
          <Image style={styles.imagePro} source={{ uri: profile.image }} />
          <Text style={styles.trainerName}>
            {profile.firstName} {profile.lastName}
          </Text>
          {userStore.user._id === session.trainer ? (
            <View
              style={{
                position: "absolute",
                right: 0,
                marginTop: "15%",
                marginRight: 30,
              }}
            >
              <Menu
                visible={visible}
                anchor={
                  <Entypo
                    onPress={showMenu}
                    name="dots-three-horizontal"
                    size={24}
                    color="white"
                  />
                }
                onRequestClose={hideMenu}
              >
                <MenuItem
                  pressColor="#FFA90D"
                  textStyle={{ color: "black" }}
                  onPress={handleEdit}
                >
                  Edit Session
                </MenuItem>
                {session.participants.length === 0 ? (
                  <MenuItem
                    pressColor="red"
                    textStyle={{ color: "red" }}
                    onPress={handleDelete}
                  >
                    Delete Session
                  </MenuItem>
                ) : (
                  <MenuItem disabled>Delete Session</MenuItem>
                )}
              </Menu>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.card}>
          <View style={styles.textCard}>
            <Text style={styles.title}>{session.title}</Text>
            <Text style={styles.description}>{session.description}</Text>
            <Text style={styles.datePrice}>
              🗓️ {new Date(session.date).toLocaleDateString()} -
              {new Date(session.date).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Text>
            <Text style={styles.duration}>⏳ {session.duration} Min</Text>
            <Text style={styles.datePrice}>💰 10KD</Text>
            {isEnrolled || isEnroll ? (
              <TouchableOpacity
                onPress={handleCancel}
                // activeOpacity={0.5}
                // disabled={true}
                style={styles.btnPressed}
              >
                <Text style={styles.btnText}>Unjoined</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleJoin} style={styles.btn}>
                <Text style={styles.btnText}>Join</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.location}>📍 Location</Text>
            <View>
              <Text style={styles.partiText}>👥 participants</Text>
              <Text style={styles.parti}>
                {session.participants.length}/{session.limit}
              </Text>
              <View>{participantsList}</View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default observer(SessionDetails);
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    // marginTop: 5,
  },
  imageContainer: {
    height: 300,
    width: "100%",
    // position: "absolute",
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
  btnPressed: {
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
    backgroundColor: "#F8D390",

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
    color: "white",
  },
  location: {
    marginTop: 20,
    fontSize: 20,
  },
  parti: {
    textAlign: "right",
    fontSize: 17,
    bottom: 20,
  },
  partiText: {
    textAlign: "left",
    fontSize: 20,
  },
  trainerInfo: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: 70,
    flexDirection: "row",
    // marginTop: 20,
  },
  imagePro: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 10,
    marginHorizontal: 10,
  },
  trainerName: {
    fontSize: 25,
    color: "white",
    marginTop: 20,
    // marginHorizontal: 5,
  },
});
