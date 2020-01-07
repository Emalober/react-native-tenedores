import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Colors } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "../account/ChangeDisplayNameForm";
import ChangeEmailForm from "../account/ChangeEmailForm";
import ChangePasswordForm from "../account/ChangePasswordForm";
import Toast from "react-native-easy-toast";

type ItemOptions = {
  title: string;
  iconType: string;
  iconNameLeft: string;
  iconColorLeft: string;
  iconNameRight: string;
  iconColorRight: string;
  onPress: () => void;
};

type AccountOptionsProps = {
  userInfo: firebase.UserInfo;
  setReloadData: (value: boolean) => void;
};

export default function AccountOptions({
  userInfo,
  setReloadData
}: AccountOptionsProps) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const toastRef = useRef();
  const menuOptions: Array<ItemOptions> = [
    {
      title: "Cambiar Nombre y Apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName")
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email")
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password")
    }
  ];

  const selectedComponent = (modal: string) => {
    switch (modal) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setReloadData={setReloadData}
            setIsVisibleModal={setIsVisibleModal}
          />
        );
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setReloadData={setReloadData}
            setIsVisibleModal={setIsVisibleModal}
          />
        );
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm
            setReloadData={setReloadData}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        break;
      default:
        break;
    }
    setIsVisibleModal(true);
  };

  return (
    <View>
      {menuOptions.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          leftIcon={{
            type: item.iconType,
            name: item.iconNameLeft,
            color: item.iconColorLeft
          }}
          rightIcon={{
            type: item.iconType,
            name: item.iconNameRight,
            color: item.iconColorRight
          }}
          onPress={item.onPress}
          containerStyle={styles.menuItem}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
