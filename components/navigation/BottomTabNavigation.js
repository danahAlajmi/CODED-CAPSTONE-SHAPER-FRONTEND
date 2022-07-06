import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import userStore from "../../stores/userStore";
import { observer } from "mobx-react";
import Profile from "../profile/Profile";
import { SignOutWhenStuck } from "../user/SignOutWhenStuck";
import { SignInPage } from "../user/SignInPage";
import { SignUpPage } from "../user/SignUpPage";
import { CreateProfile } from "../user/CreateProfile";
import ProfileNav from "./ProfileNav";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigation() {
  return (
    <>
      {userStore.user ? (
        <Tab.Navigator>
          <Tab.Screen name="ph" component={SignOutWhenStuck} />
          <Tab.Screen name="ph2" component={SignOutWhenStuck} />
          <Tab.Screen
            name="Profile"
            component={ProfileNav}
            options={{ headerShown: false }}
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
