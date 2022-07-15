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
          style={styles.scrollView}
        >
          {sessionsLists}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    width: 390,
    height: 445,
    backgroundColor: "white",
  },
});
export default observer(ProfileSessionLEnrolled);
