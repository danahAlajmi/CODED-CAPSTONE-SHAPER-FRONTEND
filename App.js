import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "./components/navigation/BottomTabNavigation";
export default function App() {
  return (
    <>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </>
  );
}
