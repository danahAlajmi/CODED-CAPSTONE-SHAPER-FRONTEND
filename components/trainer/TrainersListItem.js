import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { observer } from "mobx-react";

const trainer = {
  _id: "62c302f15b49abb902fc7774",
  username: "joe",
  password: "$2b$10$G4GFVykau3OzhJ.fEQfA6.pKruHyuS.FSmE/qYmvWrp/Du0YwRA7y",
  email: "a@hotmail.com",
  isTrainer: true,
  enrolled: [],
  owner: [],
  __v: 0,
  profile: {
    _id: "62c302f25b49abb902fc7776",
    bio: "",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    firstName: "",
    lastName: "",
    user: "62c302f15b49abb902fc7774",
    __v: 0,
  },
};
function TrainersListItem() {
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
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
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
    color: "#A09C9A",
  },
});
export default observer(TrainersListItem);
