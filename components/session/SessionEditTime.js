import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import {Text,View,TouchableOpacity,ScrollView,SafeAreaView,TextInput,StyleSheet} from "react-native";
import sessionStore from '../../stores/sessionStore';
import userStore from '../../stores/userStore';
import { useFonts } from 'expo-font';

export function SessionEditTime({ route, navigation }){
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = useState(new Date());
    const [loaded] = useFonts({
      'UbuntuBold': require('../../assets/fonts/Ubuntu-Bold.ttf'),
      'UbuntuLight': require('../../assets/fonts/Ubuntu-Light.ttf'),
      'Ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
    });
  
    if (!loaded) {
      return null;
    }
    let session =  route.params.session
    let sessionId = route.params.id
    console.log("asde",session)
    console.log("id sent",sessionId)

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
      let convDur = (+duration.getHours()*60) + (+duration.getMinutes())
      session.date = date.getTime();
      session.duration = convDur;
      session.trainer = userStore.user._id
      // console.log(session)
      sessionStore.UpdateSession(session,sessionId)
      navigation.navigate("Explore")
    }

    return (
      <SafeAreaView >
      <ScrollView >
      <View style={styles.container}>
      <Text style={styles.headerText}>Please select the session date</Text>
      <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={date.toLocaleDateString()}
              placeholderTextColor="#003f5c"
              editable={false}
            />
          </View>
          <RNDateTimePicker 
            // maximumDate={new Date(Date.now()+604800000)}
            value={date}
            mode={"date"}
            display={"inline"}
            onChange={onChangeDate}
            style={{maxHeight:"28%"}}
            accentColor="#FFA90D"
          />
      <Text style={styles.headerText}>Please select the session start time</Text>
      <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
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
              <Text style={styles.headerText}>Please select the session Duration</Text>
      <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={duration.getHours()+" hours and " +duration.getMinutes()+ " minutes"}
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
    );
  }
  const styles = StyleSheet.create({
    container: {
      marginTop:40, 
      marginLeft:30,
      marginRight:30
    },
    headerText:{
      fontSize:18,
      marginBottom: 10,
      fontFamily:"Ubuntu",
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
      fontFamily:"UbuntuLight",
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
      fontFamily:"UbuntuBold",
      alignSelf: "center",
    },
  });