import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { observer } from "mobx-react";
import sessionStore from "../../stores/sessionStore";
import SessionDumbbellCard from "./SessionDumbbellCard";
import userStore from "../../stores/userStore";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { useFonts } from "expo-font";

function Dumbbell() {
  const [loaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  const navigation = useNavigation();
  if (!loaded) {
    return null;
  }
  const timeSections = {
    today: [],
    upcoming: [],
    past: [],
  };

  const goToCreate = () => {
    navigation.navigate("SessionCreateDetail");
  };

  sessionStore.sessions
    .filter(
      (session) =>
        session.participants.includes(userStore.user._id) ||
        session.trainer === userStore.user._id
    )
    .forEach((session) => {
      if (session.date < Date.now()) {
        timeSections.past.push(
          <SessionDumbbellCard key={session._id} session={session} />
        );
      } else if (
        new Date(session.date).toLocaleDateString() ===
        new Date().toLocaleDateString()
      ) {
        timeSections.today.push(
          <SessionDumbbellCard key={session._id} session={session} />
        );
      } else {
        timeSections.upcoming.push(
          <SessionDumbbellCard key={session._id} session={session} />
        );
      }
    });

  const zeroSessions =
    timeSections.today.length === 0 &&
    timeSections.upcoming.length === 0 &&
    timeSections.past.length === 0;

  return (
    <View style={styles.container}>
      {timeSections.today.length === 0 ? (
        <></>
      ) : (
        <View style={styles.section}>
          <Text style={styles.header}>Today</Text>
          <ScrollView style={styles.sectionScroll} horizontal={true}>
            {timeSections.today}
          </ScrollView>
        </View>
      )}

      {timeSections.upcoming.length === 0 ? (
        <></>
      ) : (
        <View style={styles.section}>
          <Text style={styles.header}>Upcoming</Text>
          <ScrollView style={styles.sectionScroll} horizontal={true}>
            {timeSections.upcoming}
          </ScrollView>
        </View>
      )}

      {timeSections.past.length === 0 ? (
        <></>
      ) : (
        <View style={styles.section}>
          <Text style={styles.header}>Past</Text>
          <ScrollView style={styles.sectionScroll} horizontal={true}>
            {timeSections.past}
          </ScrollView>
        </View>
      )}
      {zeroSessions ? (
        <View style={styles.section}>
          <Text style={styles.header}>You don't have any sessions</Text>
        </View>
      ) : (
        <></>
      )}
      {userStore.user.isTrainer ? (
        <TouchableOpacity onPress={goToCreate} style={styles.addBtn}>
          <FontAwesome name="plus" size={28} color="white" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "white", height: "100%" },
  header: {
    fontSize: 35,
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: "white",
    fontFamily: "Ubuntu",
  },
  section: { backgroundColor: "white", height: 220 },
  sectionScroll: { marginLeft: 30 },
  addBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: "#FFA90D",
    borderRadius: 100,
    shadowColor: "black",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
  },
});
export default observer(Dumbbell);
