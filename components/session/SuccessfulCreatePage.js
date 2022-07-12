import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';

export function SuccessfulCreatePage({ route, navigation }) {
  
const [loaded] = useFonts({
    'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
    'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }


  let session = route.params.session;

  const goBack = () => {
    navigation.navigate("Dumbbell", {
      screen: "Dumbbell",
    });
  };

  return (
    
    <View style={styles.container}>
    <View style={{backgroundColor:"white",position:"absolute", height:10000 , width:10000}}>
    </View>
      <Text style={styles.headerText}>Congragulations 🎉</Text>
      <Text style={styles.headerText}>
        {session.title} Session Created Successfully! 🏋️‍♂️
      </Text>
      <Text style={styles.headerText}>Session Will be at:</Text>
      <Text style={styles.headerText}>
        📅 {new Date(session.date).toLocaleDateString()}
      </Text>
      <Text style={styles.headerText}>
        🕑{" "}
        {new Date(session.date).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </Text>

      <Image
        source={require("../../assets/lifting.gif")}
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
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white"
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    fontFamily:"Ubuntu",

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
    fontFamily:"UbuntuBold",
    alignSelf: "center",
  },
});
