import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./components/navigation/BottomTabNavigation";
import ProfileNav from "./components/navigation/ProfileNav";
export default function App() {
  return (
    <>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </>
  );
}
