import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import ProfileUserView from "./components/profile/ProfileUserView";
export default function App() {
  return (
    <View style={styles.container}>
      <ProfileUserView />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
