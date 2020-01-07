import React, { useState } from "react";
import { StyleSheet, View, Text, CameraRoll } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-easy-toast";

type InfoUserProps = {
  userInfo: firebase.UserInfo;
  setReloadData: (value: boolean) => void;
  toastRef: React.MutableRefObject<Toast>;
  setLoading: (value: boolean) => void;
  setTextLoading: (value: string) => void;
};

export default function InfoUser(props: InfoUserProps) {
  const {
    setReloadData,
    userInfo: { photoURL, uid, displayName, email },
    toastRef,
    setLoading,
    setTextLoading
  } = props;

  setTextLoading("Actualizando avatar");

  const handleEditAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Se necesita dar permisos para acceder a las imagenes"
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show("Se cancelo la seleccion de imgen");
      } else {
        setLoading(true);

        uploadImage(result.uri, uid)
          .then(() => {
            updatePhotoUrl(uid);
          })
          .finally(() => setLoading(false));
      }
    }
  };

  const uploadImage = async (uri: String, nameImage: String) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${nameImage}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = uid => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async result => {
        const update = {
          photoURL: result
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
      })
      .catch(() => toastRef.current.show("Error al recuperar el avatar"));
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={handleEditAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/90/abott@adorable.png"
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});
