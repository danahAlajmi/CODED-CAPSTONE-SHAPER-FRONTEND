import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import {
  ALERT_TYPE,
  Dialog,
  Root,
  Toast,
} from "react-native-alert-notification";
import { FloatingLabelInput } from "react-native-floating-label-input";
import RadioForm from "react-native-simple-radio-button";

export function SessionEditDetail({ navigation, route }) {
  let session = route.params.session;
  const [name, setName] = useState(session.title);
  const [description, setDescription] = useState(session.description);
  const [nop, setNop] = useState(session.limit + "");
  const [showError, setShowError] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const [loaded] = useFonts({
    UbuntuBold: require("../../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const radio_props = [
    { label: "Location", value: false },
    { label: "Online", value: true },
  ];
  let sessionid = route.params.session._id;

  const handleNext = () => {
    if (
      name === "" ||
      description === "" ||
      nop === 0 ||
      nop < session.participants.length
    ) {
      setShowError(true);
    } else if (isOnline) {
      let session = {
        title: name,
        description: description,
        limit: +nop,
        isOnline: isOnline,
      };
      navigation.navigate("SessionEditTime", { session, id: sessionid });
    } else {
      let session = {
        title: name,
        description: description,
        limit: +nop,
        isOnline: isOnline,
      };
      navigation.navigate("SessionEditLocation", { session, id: sessionid });
    }
  };

  return (
    <Root>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <TouchableOpacity>
              <Image
                style={styles.image}
                source={{
                  uri: "https://img.freepik.com/free-photo/man-holding-dumbbell-orange-background_438099-4325.jpg",
                }}
              />

              <View style={styles.imageOverlay} />
              <AntDesign
                name="camera"
                size={24}
                color="white"
                style={{ marginTop: 60, marginLeft: 90 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.TextInput}>
              <FloatingLabelInput
                containerStyles={{
                  borderColor: "#EAEAEA",
                  height: 50,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                }}
                labelStyles={{ fontFamily: "UbuntuLight" }}
                inputStyles={{ fontFamily: "Ubuntu", color: "black" }}
                label={"Session Name"}
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>
            <View style={styles.TextInput}>
              <FloatingLabelInput
                containerStyles={{
                  borderColor: "#EAEAEA",
                  height: 50,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                }}
                labelStyles={{ fontFamily: "UbuntuLight" }}
                inputStyles={{ fontFamily: "Ubuntu", color: "black" }}
                label={"Session Description"}
                multiline
                value={description}
                onChangeText={(value) => setDescription(value)}
              />
            </View>
            <View style={styles.NumImageView}>
              <View style={styles.inputNumberView}>
                <FloatingLabelInput
                  containerStyles={{
                    borderColor: "#EAEAEA",
                    height: 50,
                    borderWidth: 0,
                    borderBottomWidth: 0,
                  }}
                  labelStyles={{ fontFamily: "UbuntuLight" }}
                  inputStyles={{
                    fontFamily: "Ubuntu",
                    color: "black",
                    marginLeft: 50,
                    fontSize: 16,
                  }}
                  label={"No. Participants"}
                  value={nop}
                  keyboardType="numeric"
                  rightComponent={
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FFA90D",
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        width: 40,
                        height: 40,
                      }}
                      onPress={() => {
                        let num = +nop;
                        num++;
                        num = num + "";
                        setNop(num);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 30,
                          alignSelf: "center",
                          fontFamily: "UbuntuBold",
                          color: "white",
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  }
                  leftComponent={
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FFA90D",
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                        width: 40,
                        height: 40,
                      }}
                      onPress={() => {
                        let num = +nop;
                        num--;
                        num = num + "";
                        setNop(num);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 30,
                          alignSelf: "center",
                          fontFamily: "UbuntuBold",
                          color: "white",
                        }}
                      >
                        -
                      </Text>
                    </TouchableOpacity>
                  }
                  onChangeText={(nop) => setNop(nop)}
                />
              </View>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                animation={true}
                buttonColor={"#FFA90D"}
                selectedButtonColor={"#FFA90D"}
                style={{ padding: 30 }}
                labelStyle={{ fontFamily: "UbuntuBold" }}
                radioStyle={{ paddingRight: 40, paddingLeft: 30 }}
                onPress={(value) => {
                  setIsOnline(value);
                }}
              />
            </View>
            <TouchableOpacity onPress={handleNext} style={styles.SignUpBtn}>
              <Text style={styles.SignUpText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {showError ? (
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Invalid",
          textBody: "Please fill out all the information",
          onShow: () => setShowError(false),
          onHide: () => setShowError(false),
        })
      ) : (
        <></>
      )}
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
  },
  NumImageView: {
    flexDirection: "row",
    marginTop: "5%",
  },
  inputView: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    width: "90%",
    minWidth: "70%",
    maxWidth: "70%",
    height: 45,
  },
  inputNumberView: {
    borderRadius: 10,
    width: "40%",
    minWidth: "50%",
    maxWidth: "50%",
    height: 45,
    marginBottom: 100,
  },
  uploadImageBtn: {
    backgroundColor: "#FFA90D",
    height: 50,
    width: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    maxHeight: "18%",
    minHeight: "18%",
    minWidth: "90%",
    maxWidth: "90%",
    marginRight: 20,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontFamily: "UbuntuLight",
  },
  SignUpBtn: {
    minWidth: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
    marginTop: 30,
  },
  SignUpText: {
    color: "white",
    fontFamily: "UbuntuBold",
    alignSelf: "center",
  },
  imageContainer: {
    height: 140,
    width: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    height: 140,
    width: 200,
    borderRadius: 10,
    position: "absolute",
    overflow: "hidden",
  },
  imageOverlay: {
    height: 140,
    width: 200,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    ...StyleSheet.absoluteFill,
  },
  radioButtonContainer: {
    textAlign: "center",
    justifyContent: "space-between",
    marginLeft: 20,
  },
});
