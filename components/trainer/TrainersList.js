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
import userStore from "../../stores/userStore";
import TrainersListItem from "./TrainersListItem";
function TrainersList() {
  const trainersList = userStore.trainers.map((trainer) => {
    return <TrainersListItem key={trainer._id} trainer={trainer} />;
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{trainersList}</ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    //justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
  },
  scrollView: {
    width: 390,
  },
});
export default observer(TrainersList);
