import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import {
  withNavigation,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import Toast from "react-native-easy-toast";
import Loading from "../Loading";

type LoginProps = {
  navigation: NavigationScreenProp<NavigationState>;
  toastRef: React.MutableRefObject<Toast>;
};

function LoginForm(props: LoginProps) {
  const { toastRef, navigation } = props;

  const [hidePassword, setHidePasword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      toastRef.current.show("Todos los datos son obligatorios");
    } else if (!validateEmail(email)) {
      toastRef.current.show("El mail ingresado es invalido");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          toastRef.current.show("Usuario logueado correctamente");
          navigation.navigate("MyAccount");
        })
        .catch(() => {
          toastRef.current.show("Error al ingresar a la cuenta");
        });
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.formContainer} behavior="padding" enable>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          ></Icon>
        }
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePasword(!hidePassword)}
          ></Icon>
        }
      />
      <Button
        title="Entrar"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={handleLogin}
      />
      <Loading text="Entrando cuenta..." isVisible={isLoading} />
    </View>
  );
}
export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  iconRight: {
    color: "#c1c1c1"
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%"
  },
  btnLogin: {
    backgroundColor: "#008a60"
  }
});
