import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react";
import { useFonts } from "expo-font";

function ProfileSessionLNone() {
  const [loaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>None</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Ubuntu",
    fontSize: 24,
    paddingBottom: 250,
  },
});
export default observer(ProfileSessionLNone);
