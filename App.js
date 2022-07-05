import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import { SignInPage } from "./components/user/SignInPage";
import { SignUpPage } from "./components/user/SignUpPage";
import { CreateProfile } from "./components/user/CreateProfile";
import { SignOutWhenStuck } from "./components/user/SignOutWhenStuck";
export default function App() {
  return (
    <View style={styles.container}>
      <EditProfile />
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
