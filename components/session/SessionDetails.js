import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { observer } from "mobx-react";
import React from "react";
import sessionStore from "../../stores/sessionStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import profileStore from "../../stores/profileStore";
import ParticipantInfo from "./ParticipantInfo";
import userStore from "../../stores/userStore";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useState } from "react";
import { Entypo } from '@expo/vector-icons';

function SessionDetails({route}) {
  const [visible, setVisible] = useState(false);
  const [btnText, setBtnText] = useState("Join");
  const [isPress, setIsPress] = useState(false);
  const [btnStyle, setBtnStyle] = useState(styles.btn);
  
  const navigation = useNavigation();
  let user = userStore.user;
  const session = route.params;
  const participantsList = session.participants.map((participant) => {
    return <ParticipantInfo key={participant} participant={participant} />;
  });
  let profile = profileStore.getProfileById(session.trainer);

  // console.log(session);
  const handleJoin = () => {
    sessionStore.joinSession(session._id, user._id);
    setIsPress(true);
    setBtnStyle(styles.btnPressed);
    setBtnText("Unjoin");
    navigation.navigate("SuccessJoin",{session})
  };

  const handleEdit = () => {
    hideMenu()
    navigation.navigate("SessionEditDetail",{session})
  };

  const handleDelete = () => {
    hideMenu()
    sessionStore.DeleteSession(session,session._id)
    navigation.navigate("Explore")
  };
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);


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
          {userStore.user._id===session.trainer?(
        <View style={{position: 'absolute', right: 0,marginTop:"15%",marginRight:30}}>
      <Menu
        visible={visible}
        anchor={<Entypo onPress={showMenu} name="dots-three-horizontal" size={24} color="white" />}
        onRequestClose={hideMenu}
      >
        <MenuItem pressColor="#FFA90D" textStyle={{color:"black",}} onPress={handleEdit}>Edit Session</MenuItem>
        <MenuItem pressColor="red" textStyle={{color:"black",}} onPress={handleDelete}>Delete Session</MenuItem>

      </Menu>
      </View>
      )
      :
      (
      <></>
      )
      }
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
              🗓️ {new Date(session.date).toLocaleDateString()} - {new Date(session.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
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
            <TouchableOpacity onPress={handleJoin} style={btnStyle}>
              <Text style={styles.btnText}>{btnText}</Text>
            </TouchableOpacity>
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
    height: 100,
    flexDirection: "row",
    // marginTop: 20,
  },
  imagePro: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginTop: 40,
    marginHorizontal: 10,
  },
  trainerName: {
    fontSize: 25,
    color: "white",
    marginTop: 50,
    // marginHorizontal: 5,
  },
});
