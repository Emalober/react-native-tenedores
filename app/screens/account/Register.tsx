import React, { useRef } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  withNavigation,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import RegisterForm from "../../components/account/RegisterForm";
import Toast from "react-native-easy-toast";

type RegisterProps = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default function Register({ navigation }: RegisterProps) {
  const toastRef: React.MutableRefObject<Toast> = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewForm}>
        <RegisterForm
          navigation={navigation}
          toastRef={toastRef}
        ></RegisterForm>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.8}></Toast>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  }
});
