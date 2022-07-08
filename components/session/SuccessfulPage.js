import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import {Text,View,TouchableOpacity,Image,StyleSheet} from "react-native";

export function SuccessfulPage({ route, navigation }){


    const createSession = () => {

    }

    return (
      <View style={styles.container}>
      <Text style={styles.headerText}>Congragulations 🎉🎉🎉</Text>
      <Text style={styles.headerText}>Session Created Successfully!</Text>
      <Text style={styles.headerText}>🏋️‍♂️</Text>

        <Image
          source={require("../../assets/lifting.gif")}
          style={styles.backgroundImage}
        />
        <TouchableOpacity onPress={createSession} style={styles.goBackBtn}>
          <Text style={styles.goBackText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      marginTop:40, 
      marginLeft:30,
      marginRight:30,
      justifyContent:"center",
      alignItems:"center",

    },
    headerText:{
      fontSize:30,
      marginBottom: 10,
      textAlign:"center"
    },
    backgroundImage:{
        marginTop:"20%",
        height:"45%",
        width:"100%"

    },
    goBackBtn:{      
        minWidth: "40%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFA90D",
    shadowColor: "#000",
},
    goBackText:{      
        color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  });