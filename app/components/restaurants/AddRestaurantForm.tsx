import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import Toast from "react-native-easy-toast";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

type AddRestaurantFormProps = {
  navigation: NavigationScreenProp<NavigationState>;
  setIsLoading: (value: boolean) => void;
  //setReloadData: (value: boolean) => void;
  toastRef: React.MutableRefObject<Toast>;
};

export default function AddRestaurantForm({
  navigation,
  setIsLoading,
  toastRef
}: AddRestaurantFormProps) {
  const [imageSelected, setImageSelected] = useState([]);

  return (
    <ScrollView>
      <UploadImage
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

type UploadImageProps = {
  imageSelected: any[];
  setImageSelected: React.Dispatch<React.SetStateAction<any[]>>;
  toastRef: React.MutableRefObject<Toast>;
};

function UploadImage(props: UploadImageProps) {
  const { imageSelected, setImageSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    const resultPermissionsCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissionsCamera === "denied") {
      toastRef.current.show(
        "Debes dar permisos a la aplicacion para usar la camara."
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show("Has cancelado la seleccion de imagenes");
      } else {
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  const removeImage = image => {
    console.log(image);
    const arrayImages = imageSelected;

    Alert.alert(
      "Eliminar imagen",
      "¿Seguro de que quiere eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImageSelected(arrayImages.filter(imageUrl => imageUrl !== image))
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImage}>
      {imageSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {imageSelected.map((imageRestaurant, index) => (
        <Avatar
          onPress={() => removeImage(imageRestaurant)}
          containerStyle={styles.miniatureImage}
          source={{ uri: imageRestaurant }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewImage: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureImage: {
    marginRight: 10,
    height: 70,
    width: 70
  }
});
