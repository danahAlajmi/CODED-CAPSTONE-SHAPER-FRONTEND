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
import sessionStore from "../../stores/sessionStore";
import SessionsListItem from "./SessionsListItem";
function SessionsList() {
  const sessionsList = sessionStore.sessions.map((session) => {
    return <SessionsListItem session={session} />;
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{sessionsList}</ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
export default observer(SessionsList);
