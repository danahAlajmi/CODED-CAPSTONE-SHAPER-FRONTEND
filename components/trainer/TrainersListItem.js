import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { observer } from "mobx-react";
import profileStore from "../../stores/profileStore";
import { useFonts } from 'expo-font';

function TrainersListItem({ trainer }) {

const [loaded] = useFonts({
  'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
  'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
  'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
});

if (!loaded) {
  return null;
}

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
    fontFamily:"UbuntuBold",
  },
  bioText: {
    fontSize: 9,
    fontFamily:"UbuntuLight",
    marginVertical: 10,
    color: "#A09C9A",
  },
});
export default observer(TrainersListItem);
