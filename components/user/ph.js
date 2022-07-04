import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import theme from "../../assets/constants"


export function HelloWorldApp() {
  const handleSignout = () => {
    userStore.signout();
  };
  const radio_props = [
    {label: 'Trainee', value: 0 },
    {label: 'Trainer', value: 1 }
  ];
  return (

<RadioForm
          radio_props={radio_props}
          initial={0}
             formHorizontal={true}
            animation={false}
            buttonColor={'#FFA90D'}
            selectedButtonColor={'#FFA90D'}
          onPress={(value) => {console.log(value)}}
        />

//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//       }}>
//       <Text>Hello, world!</Text>
//       <TouchableOpacity onPress={handleSignout}>
//   <Text >Signout</Text>
// </TouchableOpacity>
  )
}
