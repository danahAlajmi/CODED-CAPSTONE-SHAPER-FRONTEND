import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import profileStore from "../../stores/profileStore";

function ParticipantInfo({ participant }) {
  let profile = profileStore.getProfileById(participant);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: profile.image }} />
      <Text style={styles.name}>{profile.user.username}</Text>
    </View>
  );
}
export default observer(ParticipantInfo);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: -2,
    marginBottom: 5,
    height: 45,
    width: "100%",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: 20,
    top: 8,
    marginHorizontal: 10,
  },
});
