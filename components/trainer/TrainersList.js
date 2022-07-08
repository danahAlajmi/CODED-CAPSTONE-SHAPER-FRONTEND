import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { observer } from "mobx-react";
import userStore from "../../stores/userStore";
import TrainersListItem from "./TrainersListItem";
import { useNavigation } from "@react-navigation/native";

function TrainersList() {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const trainersList = userStore.trainers
    .filter((trainer) =>
      trainer.username.toLowerCase().includes(search.toLowerCase())
    )
    .map((trainer) => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("profile");
          }}
        >
          <TrainersListItem key={trainer._id} trainer={trainer} />
        </TouchableOpacity>
      );
    });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spaceSearch}>
        <Text></Text>
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 All"
          placeholderTextColor="#003f5c"
          onChangeText={(search) => setSearch(search)}
        />
      </View>

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
    // paddingTop: 40,
  },
  spaceSearch: {
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBar: {
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    width: 330,
    backgroundColor: "#EAEAEA",
  },
  scrollView: {
    width: 390,
  },
});
export default observer(TrainersList);
