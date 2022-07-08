import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import userStore from "../../stores/userStore";

export function SignOutWhenStuck() {
  const handleSignout = () => {
    userStore.signout();
  };
  return (
    <View>
      <View style={{ height: 100 }}></View>
      <TouchableOpacity
        onPress={handleSignout}
        style={{ minWidth: "50%", backgroundColor: "red" }}
      >
        <Text>Signout</Text>
      </TouchableOpacity>
    </View>
  );
}
