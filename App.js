import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./components/navigation/BottomTabNavigation";
import ProfileNav from "./components/navigation/ProfileNav";
import { SuccessfulPage } from "./components/session/SuccessfulPage";
export default function App() {
  return (
    <>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
      {/* <SuccessfulPage /> */}
    </>
  );
}
