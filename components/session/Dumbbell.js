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

function Dumbbell() {
  const navigation = useNavigation();
  const timeSections = {
    today: [],
    upcoming: [],
    past: [],
  };

  const goToCreate = () => {
    navigation.navigate("SessionCreateDetail");
  };

  //.filter((session) => session.participants.includes(userStore.user._id))
  sessionStore.sessions.forEach((session) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Today</Text>
        {timeSections.today.length === 0 ? (
          <Text>No stuff</Text>
        ) : (
          <ScrollView style={styles.sectionScroll} horizontal={true}>
            {timeSections.today}
          </ScrollView>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Upcoming</Text>
        <ScrollView style={styles.sectionScroll} horizontal={true}>
          {timeSections.upcoming}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Past</Text>
        <ScrollView style={styles.sectionScroll} horizontal={true}>
          {timeSections.past}
        </ScrollView>
      </View>
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
  header: { fontSize: 35, marginHorizontal: 30, backgroundColor: "white" },
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
  },
});
export default observer(Dumbbell);
