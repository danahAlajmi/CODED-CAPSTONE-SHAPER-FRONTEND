import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { observer } from "mobx-react";
import sessionStore from "../../stores/sessionStore";
import SessionsListItem from "./SessionsListItem";
import { useNavigation } from "@react-navigation/native";
function SessionsList() {
  const [search, setSearch] = useState("");

  const navigation = useNavigation();
  const sessionsList = sessionStore.sessions
    .filter((session) =>
      session.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((session) => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SessionDetails", session);
          }}
        >
          <SessionsListItem key={session._id} session={session} />
        </TouchableOpacity>
      );
    });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spaceSearch}>
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 All"
          placeholderTextColor="#003f5c"
          onChangeText={(search) => setSearch(search)}
        />
      </View>
      <ScrollView style={styles.scrollView}>{sessionsList}</ScrollView>
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
  spaceSearch: {
    width: 330,
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBar: {
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    width: 310,
    backgroundColor: "#EAEAEA",
  },
  scrollView: {
    width: 390,
  },
});
export default observer(SessionsList);
