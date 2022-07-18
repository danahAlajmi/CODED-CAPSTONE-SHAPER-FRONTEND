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
    diffHrs === 0
      ? `${diffMins} minutes.`
      : `${diffHrs} hours, ${diffMins} minutes.`;
  return (
    <View style={styles.container}>
      <Text style={styles.remainingTime}>Starting in {remaining}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 120,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 5,

    padding: 5,
  },
  remainingTime: {
    fontFamily: "UbuntuBold",
    fontSize: 16,
  },
});
//
export default observer(SessionDumbbellCardInd);
