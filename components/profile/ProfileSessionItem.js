import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react";
import sessionStore from "../../stores/sessionStore";
import { useNavigation } from "@react-navigation/native";

function ProfileSessionItem({ session }) {
  const navigation = useNavigation();

  let sessionInfo = sessionStore.getSessionById(session._id);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SessionDetails", sessionInfo);
        }}
      >
        <ImageBackground
          style={styles.sessionImage}
          source={{ uri: sessionInfo.image }}
        >
          <Text style={styles.sessionTitle}>{sessionInfo.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 310,
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
export default observer(ProfileSessionItem);
