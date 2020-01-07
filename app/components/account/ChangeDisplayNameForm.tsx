import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import * as firebase from "firebase";

type ChangeDisplayNameFormProps = {
  displayName: string;
  setIsVisibleModal: (value: boolean) => void;
  setReloadData: (value: boolean) => void;
};

export default function ChangeDisplayNameForm({
  displayName,
  setIsVisibleModal,
  setReloadData
}: ChangeDisplayNameFormProps) {
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateName = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre del usuario no ha cambiado.");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el nombre");
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#2c2c2c"
        }}
        errorMessage={error}
      ></Input>
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={handleUpdateName}
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
