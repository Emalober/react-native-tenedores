import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import Toast from "react-native-easy-toast";

type AddRestaurantFormProps = {
  navigation: NavigationScreenProp<NavigationState>;
  setIsLoading: (value: boolean) => void;
  //setReloadData: (value: boolean) => void;
  toastRef: React.MutableRefObject<Toast>;
};

export default function AddRestaurantForm({
  navigation,
  setIsLoading,
  toastRef
}: AddRestaurantFormProps) {
  
  return (
    <View>
      <Text>Formulario de restaurant</Text>
    </View>
  );
}
