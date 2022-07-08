import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userStore from "../../stores/userStore";
import { observer } from "mobx-react";
import Profile from "../profile/Profile";
import { SignOutWhenStuck } from "../user/SignOutWhenStuck";
import { SignInPage } from "../user/SignInPage";
import { SignUpPage } from "../user/SignUpPage";
import { CreateProfile } from "../user/CreateProfile";
import { Image } from "react-native";
import ProfileNav from "./ProfileNav";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Explore from "../Explore";
import SessionDetails from "../session/SessionDetails";
import CreateNavigation from "./CreateNavigation";
import Home from "./Home";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigation() {
  return (
    <>
      {userStore.user ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarStyle: { borderTopWidth: 0, height: "7%", marginTop: 10 },
            headerTitleStyle: {
              color: "black",
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown:false,
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
            name="ph2"
            component={CreateNavigation}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
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
            name="Profile"
            component={ProfileNav}
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
