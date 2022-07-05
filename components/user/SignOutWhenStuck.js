import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';

export function SignOutWhenStuck() {
  const handleSignout = () => {
    userStore.signout();
  };
  return (
<View>
      <TouchableOpacity onPress={handleSignout} style={{minWidth:"50%", backgroundColor:"red"}}>
  <Text >Signout</Text>
</TouchableOpacity>
</View>
  )
}
