import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import { SignInPage } from "./components/user/SignInPage";
import { SignUpPage } from "./components/user/SignUpPage";
import { CreateProfile } from "./components/user/CreateProfile";
import { SignOutWhenStuck } from "./components/user/SignOutWhenStuck";
import BottomTabNavigation from "./components/navigation/BottomTabNavigation";
export default function App() {
  return (
    <>
      <NavigationContainer>
      <BottomTabNavigation />
      </NavigationContainer>
      {/* <Profile /> */}
      </>
  );
}



