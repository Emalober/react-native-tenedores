import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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

type RegisterFormProps = {
  navigation: NavigationScreenProp<NavigationState>;
  toastRef: React.MutableRefObject<Toast>;
};

function RegisterForm(props: RegisterFormProps) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePasword] = useState(true);
  const [hideRepeatPassword, setHideRepeatPasword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    if (!email || !password || !repeatPassword) {
      toastRef.current.show("Todos los datos son obligatorios");
    } else if (!validateEmail(email)) {
      toastRef.current.show("El mail ingresado es invalido");
    } else if (password !== repeatPassword) {
      toastRef.current.show("Las contraseñas no son iguales");
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          toastRef.current.show("Usuario creado correctamente");
          navigation.navigate("MyAccount");
        })
        .catch(() => {
          toastRef.current.show("Error al crear la cuenta");
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
      <Input
        placeholder="Repetir contraseña"
        secureTextEntry={hideRepeatPassword}
        containerStyle={styles.inputForm}
        onChange={e => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPasword(!hideRepeatPassword)}
          ></Icon>
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={handleRegister}
      />
      <Loading text="Creando cuenta..." isVisible={isLoading} />
    </View>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%"
  },
  btnRegister: {
    backgroundColor: "#008a60"
  }
});
