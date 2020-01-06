import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";

export default function RegisterForm(props) {
  const [hidePassword, setHidePasword] = useState(true);
  const [hideRepeatPassword, setHideRepeatPasword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !repeatPassword) {
      console.log("Todos los datos son obligatorios");
    } else if (!validateEmail(email)) {
      console.log("El mail ingresado es invalido");
    } else if (password !== repeatPassword) {
      console.log("Las contraseñas no son iguales");
    } else {
      await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                  .then(() => {
                    console.log("Usuario creado correctamente")
                  })
                  .catch(() => {
                    console.log("Error al crear la cuenta")
                  })
    }
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
    </View>
  );
}

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
