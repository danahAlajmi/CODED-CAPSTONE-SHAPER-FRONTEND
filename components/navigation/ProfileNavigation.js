import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";
import SessionDetails from "../session/display/SessionDetails";
import { SuccessfulEditPage } from "../session/SuccessfulEditPage";
import { SuccessfulJoinPage } from "../session/SuccessfulJoinPage";
import { SessionEditDetail } from "../session/edit/SessionEditDetail";
import { SessionEditTime } from "../session/edit/SessionEditTime";
import { SessionEditLocation } from "../session/edit/SessionEditLocaion";
import { SuccessfulCreatePage } from "../session/SuccessfulCreatePage";
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
        options={{ headerShown: false }}

        // options={({ route }) => {
        //   return {
        //     title: sessionStore.getSessionById(route.params._id).title,
        //   };
        // }}
      />
      <Screen
        name="SuccessEdit"
        component={SuccessfulEditPage}
        options={{ headerShown: false }}
      />
      <Screen
        name="SuccessJoin"
        component={SuccessfulJoinPage}
        options={{ headerShown: false }}
      />
      <Screen
        name="SuccessCreate"
        component={SuccessfulCreatePage}
        options={{ headerShown: false }}
      />
      <Screen
        name="SessionEditDetail"
        component={SessionEditDetail}
        options={{ title: "Edit Details" }}
      />
      <Screen
        name="SessionEditTime"
        component={SessionEditTime}
        options={{ title: "Edit Date" }}
      />
      <Screen
        name="SessionEditLocation"
        component={SessionEditLocation}
        options={{ title: "Edit Location" }}
      />
    </Navigator>
  );
}
export default observer(ProfileNav);
