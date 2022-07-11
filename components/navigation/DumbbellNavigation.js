import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import { SessionCreateDetail } from "../session/SessionCreateDetail";
import { SessionCreateLocation } from "../session/SessionCreateLocation";
import { SessionCreateTime } from "../session/SessionCreateTime";
import { SuccessfulCreatePage } from "../session/SuccessfulCreatePage";
import Dumbbell from "../session/Dumbbell";

const Stack = createNativeStackNavigator();

function DumbbellNavigation() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Dumbbell"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dumbbell" component={Dumbbell} />
      <Stack.Screen
        name="SessionCreateDetail"
        component={SessionCreateDetail}
      />

      <Stack.Screen
        name="SessionCreateLocation"
        component={SessionCreateLocation}
      />
      <Stack.Screen name="SessionCreateTime" component={SessionCreateTime} />
      <Stack.Screen
        name="SuccessCreate"
        component={SuccessfulCreatePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default observer(DumbbellNavigation);
