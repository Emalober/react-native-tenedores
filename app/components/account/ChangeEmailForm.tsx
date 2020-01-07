import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";

type ChangeEmailFormProps = {
  email: string;
  setIsVisibleModal: (value: boolean) => void;
  setReloadData: (value: boolean) => void;
};

export default function ChangeEmailForm({
  email,
  setIsVisibleModal,
  setReloadData
}: ChangeEmailFormProps) {
  const [newEmail, setNewEmail] = useState(null);
  const [error, setError] = useState({
    email: null,
    password: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePasword] = useState(true);
  const [password, setPassword] = useState("");

  const handleUpdateEmail = () => {
    setError({
      email: null,
      password: null
    });
    if (!newEmail || email === newEmail) {
      console.log("El email no se ha modificado.");

      setError({
        email: "El email no se ha modificado.",
        password: ""
      });
    } else {
      setIsLoading(true);

      reauthenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              console.log("Email actualizado");

              setIsLoading(false);
              setReloadData(true);
              setIsVisibleModal(false);
            })
            .catch(() => {
              console.log("Error al actualizar el email");

              setError({
                email: "Error al actualizar el email",
                password: null
              });
              setIsLoading(false);
            });
        })
        .catch(() => {
          console.log("La contraseña es incorrecta.");

          setError({
            email: null,
            password: "La contraseña es incorrecta."
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Email"
        containerStyle={styles.input}
        defaultValue={email && email}
        onChange={e => setNewEmail(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#2c2c2c"
        }}
        errorMessage={error.email}
      ></Input>
      <Input
        placeholder="Contraseña"
        secureTextEntry={hidePassword}
        containerStyle={styles.input}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#2c2c2c",
          onPress: () => setHidePasword(!hidePassword)
        }}
        errorMessage={error.password}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={handleUpdateEmail}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "90%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
