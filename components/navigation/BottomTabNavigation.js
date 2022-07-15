import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userStore from "../../stores/userStore";
import { observer } from "mobx-react";
import { SignInPage } from "../user/SignInPage";
import { SignUpPage } from "../user/SignUpPage";
import { CreateProfile } from "../user/CreateProfile";
import ProfileNavigation from "./ProfileNavigation";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import DumbbellNavigation from "./DumbbellNavigation";
import HomeNavigation from "./HomeNavigation";
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigation() {
  const [loaded] = useFonts({
    'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      {userStore.user ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarStyle: { borderTopWidth: 0, height: "7%", marginTop: 10 },
            headerTitleStyle: {
              color: "black",
              fontFamily:"UbuntuBold",
            },
            headerTitleAlign: "center",
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons
                    name="md-home"
                    size={28}
                    color={tabInfo.focused ? "#FFA90D" : "black"}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="My Sessions"
            component={DumbbellNavigation}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: (tabInfo) => {
                return (
                  <FontAwesome5
                    name="dumbbell"
                    size={28}
                    color={tabInfo.focused ? "#FFA90D" : "black"}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="ProfileMenu"
            component={ProfileNavigation}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons
                    name="person"
                    size={28}
                    color={tabInfo.focused ? "#FFA90D" : "black"}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Signin"
            component={SignInPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUpPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateProfile"
            component={CreateProfile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}

export default observer(BottomTabNavigation);
