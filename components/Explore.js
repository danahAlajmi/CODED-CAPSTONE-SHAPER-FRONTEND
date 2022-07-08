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
import TrainersList from "./trainer/TrainersList";
import SessionsList from "./session/SessionsList";
const Tab = createMaterialTopTabNavigator();
function Explore() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarContentContainerStyle: {},
        tabBarIndicatorStyle: { backgroundColor: "#FFA90D" },
      }}
    >
      <Tab.Screen name="Trainers" component={TrainersList} />
      <Tab.Screen name="Sessions" component={SessionsList} />

    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({});
export default observer(Explore);
