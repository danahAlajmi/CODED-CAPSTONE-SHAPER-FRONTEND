import { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { useFonts } from "expo-font";
import googleApi from "../../../constantsSecret";
export function SessionCreateLocation({ route, navigation }) {
  const [loaded] = useFonts({
    UbuntuBold: require("../../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../../assets/fonts/Ubuntu-Regular.ttf"),
  });
  const [location, setLocation] = useState({
    latitude: 29.358,
    longitude: 47.906,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  });
  if (!loaded) {
    return null;
  }

  let session = route.params.session;

  const handleLocation = (l) => {
    setLocation({ ...l, latitudeDelta: 0.035, longitudeDelta: 0.035 });
  };
  const handleNext = () => {
    session.location = `${location.latitude},${location.longitude}`;
    navigation.navigate("SessionCreateTime", { session });
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={location}
          style={StyleSheet.absoluteFillObject}
          mapType={"satelite"}
          onPress={(event) => handleLocation(event.nativeEvent.coordinate)}
        >
          <GooglePlacesAutocomplete
            placeholder="Search"
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              let loc = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              };
              handleLocation(loc);
            }}
            query={{
              key: googleApi,
              language: "en",
              components: "country:kw",
            }}
          />
          <Marker coordinate={location}></Marker>
        </MapView>
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 500,
  },
  nextBtn: {
    minWidth: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 550,
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
  },
  nextText: {
    color: "white",
    fontFamily: "UbuntuBold",
    alignSelf: "center",
  },
});
