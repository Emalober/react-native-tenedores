import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";

export default function UserGuest() {
  return (
    <View>
      <Text>Usuario logeqdo </Text>
      <Button
        title="Cerrar sesión" onPress={() => firebase.auth().signOut()}/>
    </View>
  );
}
