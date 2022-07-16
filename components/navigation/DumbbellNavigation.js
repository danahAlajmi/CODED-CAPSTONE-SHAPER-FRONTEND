import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";

import SessionDetails from "../session/display/SessionDetails";
import sessionStore from "../../stores/sessionStore";
import ProfileUserView from "../profile/ProfileUserView";
import { SessionCreateDetail } from "../session/create/SessionCreateDetail";
import { SessionCreateLocation } from "../session/create/SessionCreateLocation";
import { SessionCreateTime } from "../session/create/SessionCreateTime";
import { SuccessfulCreatePage } from "../session/SuccessfulCreatePage";
import { SuccessfulJoinPage } from "../session/SuccessfulJoinPage";
import { SuccessfulCancelPage } from "../session/SuccessfulCancelPage";
import { SessionEditDetail } from "../session/edit/SessionEditDetail";
import { SessionEditTime } from "../session/edit/SessionEditTime";
import { SessionEditLocation } from "../session/edit/SessionEditLocaion";
import Dumbbell from "../session/Dumbbell";
import Profile from "../profile/Profile";
const Stack = createNativeStackNavigator();

function DumbbellNavigation() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Dumbbell"
      screenOptions={{
        headerTitleStyle: {
          color: "black",
          fontFamily: "UbuntuBold",
        },
      }}
    >
      <Stack.Screen
        name="Dumbbell"
        component={Dumbbell}
        options={{
          title: "My Sessions",
        }}
      />

      <Stack.Screen
        name="SessionCreateDetail"
        component={SessionCreateDetail}
        options={{
          title: "Session Details",
        }}
      />

      <Stack.Screen
        name="SessionCreateLocation"
        component={SessionCreateLocation}
        options={{
          title: "Session Location",
        }}
      />
      <Stack.Screen
        name="SessionCreateTime"
        component={SessionCreateTime}
        options={{
          title: "Session Date",
        }}
      />
      <Stack.Screen
        name="SuccessCreate"
        component={SuccessfulCreatePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={ProfileUserView} />
      <Stack.Screen
        name="SessionDetails"
        component={SessionDetails}
        options={({ route }) => {
          return {
            title: sessionStore.getSessionById(route.params._id).title,
          };
        }}
      />
      <Stack.Screen
        name="SuccessJoin"
        component={SuccessfulJoinPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuccessCancel"
        component={SuccessfulCancelPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SessionEditDetail"
        component={SessionEditDetail}
        options={{ title: "Edit Details" }}
      />
      <Stack.Screen
        name="SessionEditTime"
        component={SessionEditTime}
        options={{ title: "Edit Date" }}
      />
      <Stack.Screen
        name="SessionEditLocation"
        component={SessionEditLocation}
        options={{ title: "Edit Location" }}
      />
    </Stack.Navigator>
  );
}
export default observer(DumbbellNavigation);
