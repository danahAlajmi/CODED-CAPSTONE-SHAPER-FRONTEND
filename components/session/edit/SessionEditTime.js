import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import sessionStore from "../../../stores/sessionStore";
import userStore from "../../../stores/userStore";
import { useFonts } from "expo-font";
import {
  ALERT_TYPE,
  Dialog,
  Root,
  Toast,
} from "react-native-alert-notification";

export function SessionEditTime({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState(new Date());
  const [showError, setShowError] = useState(false);
  const [conflictSession, setConflictSession] = useState(null);
  const [loaded] = useFonts({
    UbuntuBold: require("../../../assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuLight: require("../../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu: require("../../../assets/fonts/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  let session = route.params.session;
  let sessionId = route.params.id;

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onChangeDuration = (event, selectedDuration) => {
    const currentDuration = selectedDuration;
    setDuration(currentDuration);
    // use .getTime to switch it to the UTC formate
  };

  const editSession = () => {
    let convDur = +duration.getHours() * 60 + +duration.getMinutes();
    session.date = date.getTime();
    session.duration = convDur;
    session.trainer = userStore.user._id;
    const filteredSessions = sessionStore.sessions.filter(
      (session) => session.trainer === userStore.user._id
    );
    let pass = true;
    let newEnd = session.date + convDur * 60 * 1000;
    filteredSessions.forEach((session) => {
      if (
        newEnd < session.date ||
        date.getTime() > session.date + session.duration * 60 * 1000
      )
        console.log(pass);
      else if (sessionId !== session._id) {
        setConflictSession({
          title: session.title,
          startTime: new Date(session.date).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          endTime: new Date(
            session.date + session.duration * 60 * 1000
          ).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        });
        console.log(conflictSession);
        pass = false;
      }
    });

    if (pass) {
      sessionStore.UpdateSession(session, sessionId);
      navigation.navigate("SuccessEdit", { session });
    } else {
      setShowError(true);
    }
  };

  return (
    <Root>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              backgroundColor: "white",
              position: "absolute",
              height: 10000,
              width: 10000,
            }}
          ></View>
          <View style={styles.container}>
            <Text style={styles.headerText}>
              Please select the session date
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder={date.toLocaleDateString()}
                placeholderTextColor="#003f5c"
                editable={false}
              />
            </View>
            <RNDateTimePicker
              minimumDate={new Date(Date.now())}
              // maximumDate={new Date(Date.now()+604800000)}
              value={date}
              mode={"date"}
              display={"inline"}
              onChange={onChangeDate}
              style={{ maxHeight: "28%" }}
              accentColor="#FFA90D"
            />
            <Text style={styles.headerText}>
              Please select the session start time
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder={date.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                placeholderTextColor="#003f5c"
                editable={false}
              />
            </View>
            <RNDateTimePicker
              value={date}
              mode={"time"}
              display={"spinner"}
              is24Hour={true}
              onChange={onChangeDate}
            />
            <Text style={styles.headerText}>
              Please select the session Duration
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder={
                  duration.getHours() +
                  " hours and " +
                  duration.getMinutes() +
                  " minutes"
                }
                placeholderTextColor="#003f5c"
                editable={false}
              />
            </View>
            <RNDateTimePicker
              value={duration}
              mode={"countdown"}
              onChange={onChangeDuration}
            />
            <TouchableOpacity onPress={editSession} style={styles.CreateBtn}>
              <Text style={styles.CreateText}>Edit Session</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      {showError ? (
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Invalid",
          textBody: `Your session is in conflict with another session called ${conflictSession.title} that starts at ${conflictSession.startTime} and ends at ${conflictSession.endTime}`,
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
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
  inputView: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    width: "90%",
    minWidth: "70%",
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontFamily: "UbuntuLight",
  },
  CreateBtn: {
    minWidth: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
  },
  CreateText: {
    color: "white",
    fontFamily: "UbuntuBold",
    alignSelf: "center",
  },
});
