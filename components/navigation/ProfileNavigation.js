import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";
import SessionDetails from "../session/display/SessionDetails";
import { SuccessfulCancelPage } from "../session/SuccessfulCancelPage";
import { SuccessfulJoinPage } from "../session/SuccessfulJoinPage";
import { Button } from "react-native";
import ProfileUserView from "../profile/ProfileUserView";
import sessionStore from "../../stores/sessionStore";

const { Navigator, Screen } = createNativeStackNavigator();

function ProfileNav() {
  const navigation = useNavigation();
  return (
    <Navigator initialRouteName="MyProfile" screenOptions={{}}>
      <Screen
        name="MyProfile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Screen name="Profile" component={ProfileUserView} />
      <Screen
        name="SessionDetails"
        component={SessionDetails}
        options={({ route }) => {
          return {
            title: sessionStore.getSessionById(route.params._id).title,
          };
        }}
      />
      <Screen
        name="SuccessCancel"
        component={SuccessfulCancelPage}
        options={{ headerShown: false }}
      />
      <Screen
        name="SuccessJoin"
        component={SuccessfulJoinPage}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
export default observer(ProfileNav);
