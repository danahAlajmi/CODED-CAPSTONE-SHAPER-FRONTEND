import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";

const { Navigator, Screen } = createNativeStackNavigator();

function ProfileNav() {
  const navigation = useNavigation();
  return (
    <Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Profile" component={Profile} />
      <Screen name="EditProfile" component={EditProfile} />
    </Navigator>
  );
}
export default observer(ProfileNav);
