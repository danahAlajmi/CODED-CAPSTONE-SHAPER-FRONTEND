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
import userStore from "../../stores/userStore";
import sessionStore from "../../stores/sessionStore";
import ProfileSessionItem from "./ProfileSessionItem";
function ProfileSessionLEnrolled() {
  const sessionsLists = userStore.user.enrolled
    ?.map((session) => sessionStore.getSessionById(session))
    .map((session) => {
      return <ProfileSessionItem key={session._id} session={session} />;
    });

  return (
    <SafeAreaView>
      {sessionsLists.length === 0 ? (
        <View>
          <Text>None</Text>
        </View>
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
  },
});
export default observer(ProfileSessionLEnrolled);
