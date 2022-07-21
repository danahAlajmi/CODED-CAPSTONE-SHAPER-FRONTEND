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
import googleApi from "../../../ignoreThis/constantsSecret";
import { useFonts } from "expo-font";

export function SessionEditLocation({ route, navigation }) {
  const [loaded] = useFonts({
    UbuntuBold: require("../../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../../assets/fonts/Ubuntu-Regular.ttf"),
  });
  const [location, setLocation] = useState({
    latitude: 29.358,
    longitude: 47.906,
    latitudeDelta: 0.0035,
    longitudeDelta: 0.0035,
  });
  if (!loaded) {
    return null;
  }
  let sessionId = route.params.id;
  let session = route.params.session;

  const handleLocation = (l) => {
    setLocation({ ...l, latitudeDelta: 0.0035, longitudeDelta: 0.0035 });
  };
  const handleNext = () => {
    session.location = `${location.latitude},${location.longitude}`;
    navigation.navigate("SessionEditTime", { session, id: sessionId });
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
            placeholder="🔍 Search here"
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            isRowScrollable={false}
            enablePoweredByContainer={false}
            styles={{
              listView: {
                position: "absolute",
                marginTop: 41,
                width: "95%",
                marginLeft: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
              textInput: {
                borderRadius: 10,
                maxWidth: "95%",
                marginLeft: 10,
                marginTop: 10,
              },
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
            renderRow={(rowData) => {
              const title = rowData.structured_formatting.main_text;
              const address = rowData.structured_formatting.secondary_text;
              return (
                <View>
                  <Text style={{ fontSize: 12 }}>{title}</Text>
                  <Text style={{ fontSize: 12 }}>{address}</Text>
                </View>
              );
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
