import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import { SessionCreateDetail } from "../session/SessionCreateDetail";
import { SessionCreateTime } from './../session/SessionCreateTime';
import { SuccessfulPage } from "../session/SuccessfulPage";

const Stack = createNativeStackNavigator();


function CreateNavigation() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="SessionCreateDetail"
      screenOptions={{
      }}
    >
      <Stack.Screen name="SessionCreateDetail" component={SessionCreateDetail} />
      <Stack.Screen name="SessionCreateTime" component={SessionCreateTime} />
      <Stack.Screen name="Success" component={SuccessfulPage} options={{headerShown:false}} />

    </Stack.Navigator>
  );
}
export default observer(CreateNavigation);
