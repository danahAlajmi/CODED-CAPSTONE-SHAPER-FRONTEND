import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { observer } from "mobx-react";
import profileStore from "../../stores/profileStore";
function TrainersListItem({ trainer }) {
  //trainer.profile = profileStore.getProfileById(trainer._id);
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          style={styles.trainerImage}
          source={{ uri: trainer.profile.image }}
        />
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.nameText}>{trainer.username}</Text>
        <Text style={styles.bioText}>{trainer.profile.bio}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 330,
    flexDirection: "row",

    marginVertical: 10,
    marginHorizontal: 30,
  },
  leftSection: {
    width: 115,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  trainerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  rightSection: {
    width: 215,
    borderRadius: 10,
    padding: 10,
  },
  nameText: {
    fontSize: 16,
  },
  bioText: {
    fontSize: 9,
    marginVertical: 10,
    color: "#A09C9A",
  },
});
export default observer(TrainersListItem);
