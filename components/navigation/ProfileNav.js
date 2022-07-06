import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";
import { Button } from "react-native";

const { Navigator, Screen } = createNativeStackNavigator();

function ProfileNav() {
  const navigation = useNavigation();
  return (
    <Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Screen name="Profile" component={Profile} />
      <Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Profile")}
              title="Done"
            />
          ),
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate("Profile")}
              title="Cancle"
              color="#A09C9A"
            />
          ),
        }}
      />
    </Navigator>
  );
}
export default observer(ProfileNav);
