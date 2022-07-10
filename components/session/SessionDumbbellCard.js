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
import userStore from "../../stores/userStore";
function SessionDumbbellCard({ session }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.sessionImage}
        source={{ uri: session.image }}
      >
        <Text style={styles.sessionTitle}>{session.title}</Text>
        {userStore.user._id === session.trainer ? (
          <Image
            style={styles.trainerInd}
            source={require("../../assets/icon.png")}
          ></Image>
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 120,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 5,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    fontSize: 14,
    padding: 12.5,
    position: "relative",
    top: "70%",
  },
  trainerInd: {
    height: 35,
    width: 35,

    position: "absolute",
    bottom: 10,
    right: 8,
  },
});
export default observer(SessionDumbbellCard);
