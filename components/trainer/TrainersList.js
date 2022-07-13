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
import { useFonts } from "expo-font";

function TrainersList() {
  const [search, setSearch] = useState("");
  const [loaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  const navigation = useNavigation();
  if (!loaded) {
    return null;
  }

  const trainersList = userStore.trainers
    .filter((trainer) =>
      trainer.username.toLowerCase().includes(search.toLowerCase())
    )
    .map((trainer) => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", { trainer });
          }}
          key={trainer._id}
        >
          <TrainersListItem trainer={trainer} />
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {trainersList}
      </ScrollView>
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
    fontFamily: "UbuntuLight",
  },
  scrollView: {
    width: 390,
  },
});
export default observer(TrainersList);
