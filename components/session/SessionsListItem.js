import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react";
// import SessionDetails from "./SessionDetails";

function SessionsListItem({ session }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.sessionImage}
        source={{ uri: session.image }}
      >
        <Text style={styles.sessionTitle}>{session.title}</Text>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 330,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 30,
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
    fontSize: 30,
    padding: 12.5,
    position: "relative",
    top: "50%",
  },
});
export default observer(SessionsListItem);
