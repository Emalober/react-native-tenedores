import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import InputPassword from "../ui/InputPassword";
import { reauthenticate } from "../../utils/Api";
import * as firebase from "firebase";
import Toast from "react-native-easy-toast";

type ChangePasswordFormProps = {
  setIsVisibleModal: (value: boolean) => void;
  setReloadData: (value: boolean) => void;
  toastRef: React.MutableRefObject<Toast>;
};

export default function ChangePasswordForm({
  setIsVisibleModal,
  setReloadData,
  toastRef
}: ChangePasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({
    password: null,
    newPassword: null,
    retryPassword: null
  });

  const handleUpdatePassword = () => {
    setError({
      password: null,
      newPassword: null,
      retryPassword: null
    });
    if (!password || !newPassword || !repeatPassword) {
      setError({
        password: password ? null : "El campo es obligatorio",
        newPassword: newPassword ? null : "El campo es obligatorio",
        retryPassword: repeatPassword ? null : "El campo es obligatorio"
      });
    } else if (newPassword !== repeatPassword) {
      console.log("Las contraseñas no son iguales");

      setError({
        password: null,
        newPassword: "Las contraseñas no son iguales",
        retryPassword: "Las contraseñas no son iguales"
      });
    } else {
      setIsLoading(true);

      reauthenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updatePassword(newPassword)
            .then(() => {
              console.log("Contraseña actualizada");

              setIsLoading(false);
              setReloadData(true);
              setIsVisibleModal(false);
            })
            .catch(() => {
              console.log("Error al actualizar la contraseña");
              toastRef.current.show("Error al actualizar la contraseña");
              setIsLoading(false);
            });
        })
        .catch(() => {
          console.log("La contraseña es incorrecta.");
          setError({
            password: "La contraseña es incorrecta.",
            newPassword: null,
            retryPassword: null
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <InputPassword
        placeholder="Contraseña actual"
        setPassword={setPassword}
        errorMessage={error.password}
      />
      <InputPassword
        placeholder="Nueva contraseña"
        setPassword={setNewPassword}
        errorMessage={error.newPassword}
      />
      <InputPassword
        placeholder="Repetir nueva contraseña"
        setPassword={setRepeatPassword}
        errorMessage={error.retryPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={handleUpdatePassword}
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
  btnContainer: {
    marginTop: 20,
    width: "90%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
