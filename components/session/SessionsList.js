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
import { useNavigation } from '@react-navigation/native';
function SessionsList() {
  const navigation = useNavigation();
  const sessionsList = sessionStore.sessions.map((session) => {
    return(     
    <TouchableOpacity
    onPress={() => {
      navigation.navigate("SessionDetails",session)
    }}
    ><SessionsListItem key={session._id} session={session} />
      </TouchableOpacity>
  )
  });
  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        {sessionsList}

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
  },
  scrollView: {
    width: 390,
  },
});
export default observer(SessionsList);
