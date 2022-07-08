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
function SessionsList() {
  const [search, setSearch] = useState("");
  const sessionsList = sessionStore.sessions
    .filter((session) =>
      session.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((session) => {
      return <SessionsListItem key={session._id} session={session} />;
    });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spaceSearch}>
        <Text>🔍</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="All"
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
