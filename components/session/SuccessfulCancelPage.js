import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

export function SuccessfulCancelPage({ route, navigation }) {
  let session = route.params.session;

  const goBack = () => {
    navigation.navigate("Home", {
      screen: "Explore",
      params: {
        screen: "Sessions",
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerText}>Sorry 🙏🏻</Text> */}
      <Text style={styles.headerText}>
        You have Canceled {session.title} session
      </Text>
      <Image
        source={require("../../assets/cancled.gif")}
        style={styles.backgroundImage}
      />
      <TouchableOpacity onPress={goBack} style={styles.goBackBtn}>
        <Text style={styles.goBackText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  backgroundImage: {
    height: "45%",
    width: "100%",
  },
  goBackBtn: {
    minWidth: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
  },
  goBackText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
