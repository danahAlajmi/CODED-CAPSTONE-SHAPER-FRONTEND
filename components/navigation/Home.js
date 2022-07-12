import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import Explore from "./Explore";
import ProfileUserView from "../profile/ProfileUserView";
import SessionDetails from "../session/SessionDetails";
import sessionStore from "./../../stores/sessionStore";
import { SuccessfulJoinPage } from "../session/SuccessfulJoinPage";
import { SuccessfulCancelPage } from "../session/SuccessfulCancelPage";
import { SessionEditDetail } from "../session/SessionEditDetail";
import { SessionEditTime } from "../session/SessionEditTime";
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

function Home() {
  const [loaded] = useFonts({
    'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Explore" screenOptions={{
      headerTitleStyle: {
      color: "black",
      fontFamily:"UbuntuBold",
    },}}>
      <Stack.Screen name="Explore" component={Explore} />
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
        name="SessionEditDetail"
        component={SessionEditDetail}
        options={{ title: "Edit" }}
      />
      <Stack.Screen
        name="SessionEditTime"
        component={SessionEditTime}
        options={{ title: "Edit" }}
      />
    </Stack.Navigator>
  );
}
export default observer(Home);
