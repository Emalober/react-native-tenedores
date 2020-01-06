import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Button, Divider } from "react-native-elements";
import {
  withNavigation,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import LoginForm from "../../components/account/LoginForm";
import Toast from "react-native-easy-toast";

type LoginProps = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default function Login(props: LoginProps) {
  const { navigation } = props;
  const toastRef: React.MutableRefObject<Toast> = useRef();

  const handleRegisterPress = (): void => {
    navigation.navigate("Register");
  };

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      ></Image>
      <View style={styles.viewContainer}>
        <LoginForm navigation={navigation} toastRef={toastRef}></LoginForm>
        <CreateAccoutn onPress={handleRegisterPress}></CreateAccoutn>
      </View>
      <Divider style={styles.divider}></Divider>
      <View style={styles.viewContainer}>
        <Text>Login Facebook</Text>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.8}></Toast>
    </ScrollView>
  );
}

type CreateAccoutnProps = {
  onPress: () => void;
  //containerStyle?: StyleProp<ViewStyle>;
  //testID?: string;
};

function CreateAccoutn(props: CreateAccoutnProps) {
  const { onPress } = props;

  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text style={styles.btnregister} onPress={onPress}>
        Registrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnregister: {
    color: "#00a680",
    fontWeight: "bold"
  }
});
