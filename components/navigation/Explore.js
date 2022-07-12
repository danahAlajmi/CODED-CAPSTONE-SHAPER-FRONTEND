import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { observer } from "mobx-react";
import TrainersList from "../trainer/TrainersList";
import SessionsList from "../session/SessionsList";
import { useFonts } from 'expo-font';

const Tab = createMaterialTopTabNavigator();
function Explore() {
  const [loaded] = useFonts({
    'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarContentContainerStyle: {},
        tabBarIndicatorStyle: { backgroundColor: "#FFA90D" },
        tabBarLabelStyle:{fontFamily:"UbuntuBold"}
      }}
    >
      <Tab.Screen name="Trainers" component={TrainersList} />
      <Tab.Screen name="Sessions" component={SessionsList} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({});
export default observer(Explore);
