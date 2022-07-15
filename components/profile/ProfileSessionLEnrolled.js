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
import ProfileSessionItem from "./ProfileSessionItem";
import ProfileSessionLNone from "./ProfileSessionLNone";
function ProfileSessionLEnrolled({ id }) {
  const sessionsLists = sessionStore.sessions
    .filter((session) => session.participants.includes(id))
    .map((session) => {
      return <ProfileSessionItem key={session._id} session={session} />;
    });

  return (
    <SafeAreaView>
      {sessionsLists.length === 0 ? (
        <ProfileSessionLNone />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: "100%" }}
          style={styles.scrollView}
        >
          <View style={styles.container}>{sessionsLists}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
  },
});
export default observer(ProfileSessionLEnrolled);
