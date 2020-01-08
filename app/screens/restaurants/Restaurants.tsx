import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import AddRestaurant from "./AddRestaurant";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import * as firebase from "firebase";

type RestaurantsProps = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default function Restaurants({ navigation }: RestaurantsProps) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text>Estos son los Restaurantes</Text>
      {user && <AddRestaurantButton navigation={navigation} />}
    </View>
  );
}

function AddRestaurantButton({ navigation }: RestaurantsProps) {
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddRestaurant")}
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
