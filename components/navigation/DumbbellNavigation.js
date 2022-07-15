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
import Dumbbell from "../session/Dumbbell";

const Stack = createNativeStackNavigator();

function DumbbellNavigation() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Dumbbell"

    >
      <Stack.Screen name="Dumbbell" component={Dumbbell} options={{
        title:"My Sessions"
      }}/>

      <Stack.Screen
        name="SessionCreateDetail"
        component={SessionCreateDetail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SessionCreateLocation"
        component={SessionCreateLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SessionCreateTime" component={SessionCreateTime} />
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
    </Stack.Navigator>
  );
}
export default observer(DumbbellNavigation);
