import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import {Text,View,} from "react-native";

export function SessionCreateTime(){
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
      console.log(date.getTime()) 
      // .getTime to switch it to the UTC formate
    };
    return (
      <View style={{marginTop:40}}>
        <Text>Please select the date</Text>
        <Text>{date.toLocaleDateString()}</Text>
          <RNDateTimePicker 
            maximumDate={new Date(Date.now()+400000000)}
            minimumDate={new Date(Date.now())}
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            display={"inline"}
            is24Hour={true}
            onChange={onChange}
          />
        <Text>Please select the time</Text>
        <Text>{date.toLocaleString()}</Text>
           <RNDateTimePicker 
            testID="dateTimePicker"
            value={date}
            mode={"time"}
            display={"spinner"}
            is24Hour={true}
            onChange={onChange}
          />
      </View>
    );
  }