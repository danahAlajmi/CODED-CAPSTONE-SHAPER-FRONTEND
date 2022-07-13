import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./components/navigation/BottomTabNavigation";
import { SignOutWhenStuck } from "./components/user/SignOutWhenStuck";
export default function App() {
  return (
    <>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </>
  );
}

/*

import { SignOutWhenStuck } from "./components/user/SignOutWhenStuck";
export default function App() {
  return (
    <>
        <SignOutWhenStuck />
    </>
  );
}


export default function App() {
  return (
    <>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </>
  );
}
*/
