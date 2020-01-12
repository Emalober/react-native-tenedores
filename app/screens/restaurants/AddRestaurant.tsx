import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import Loading from "../../components/Loading";
import AddRestaurantForm from "../../components/restaurants/AddRestaurantForm";

type AddRestaurantProps = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default function AddRestaurant({ navigation }: AddRestaurantProps) {
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddRestaurantForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      <Toast ref={toastRef} position="center" opacity={0.8} />
      <Loading isVisible={isLoading} text="Creando restaurant" />
    </View>
  );
}
