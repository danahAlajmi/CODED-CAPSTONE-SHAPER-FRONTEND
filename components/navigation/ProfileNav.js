import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";
import SessionDetails from "../session/SessionDetails";
import { Button } from "react-native";
import sessionStore from "../../stores/sessionStore";

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
      <Screen
        name="SessionDetail"
        component={SessionDetails}
        options={({ route }) => {
          return {
            title: sessionStore.getSessionById(route.params._id).title,
          };
        }}
      />
    </Navigator>
  );
}
export default observer(ProfileNav);
