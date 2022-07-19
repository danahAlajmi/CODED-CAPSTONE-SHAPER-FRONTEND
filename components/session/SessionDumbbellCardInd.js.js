import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { observer } from "mobx-react";
import { useFonts } from "expo-font";
import userStore from "../../stores/userStore";
function SessionDumbbellCardInd({ session }) {
  const [loaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  var timeNow = Date.now();
  var startTime = session.date;
  var diffMs = startTime - timeNow; // milliseconds between now & Christmas
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  const remaining =
    diffHrs === 0 ? `${diffMins} minutes.` : `${diffHrs} hrs ${diffMins} mins.`;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SessionDetails", session);
        }}
      >
        <ImageBackground
          style={styles.sessionImage}
          source={{ uri: session.image }}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.sessionTitle}>{session.title}</Text>
            <Text style={styles.remainingTime}>{remaining}</Text>
          </View>

          {userStore.user._id === session.trainer ? (
            <Image
              style={styles.trainerInd}
              source={require("../../assets/icon.png")}
            ></Image>
          ) : (
            <></>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 320,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  remainingTime: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    color: "#ECECEC",
    marginRight: 5,
    top: 0,
  },
  sessionImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  holdingTitle: {
    backgroundColor: "green",
    borderRadius: 20,
  },
  sessionTitle: {
    color: "white",
    fontSize: 14,
    // padding: 12.5,
    // position: "relative",
    left: 0,
    top: -5,
    fontFamily: "UbuntuBold",
  },
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 200,
    color: "white",
    fontSize: 14,
    padding: 15,
    position: "relative",
    top: "60%",
    fontFamily: "Ubuntu",
  },
  trainerInd: {
    height: 25,
    width: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    position: "absolute",
    top: 8,
    left: 4,
  },
});
//
export default observer(SessionDumbbellCardInd);
