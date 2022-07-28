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
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

function SessionDumbbellCard({ session }) {
  const [loaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  const navigation = useNavigation();
  if (!loaded) {
    return null;
  }
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
          <View style={styles.sessionTitle}>
            <Text style={styles.STitle}>{session.title}</Text>
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
  STitle: {
    color: "white",
    fontSize: 14,
    // padding: 12.5,
    position: "relative",
    top: "-20%",
    fontFamily: "Ubuntu",
  },
  sessionTitle: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    fontSize: 14,
    padding: 12.5,
    position: "relative",
    top: "70%",
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
export default observer(SessionDumbbellCard);
