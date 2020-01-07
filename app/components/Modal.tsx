import React, { ReactElement } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay } from "react-native-elements";

type ModalProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  children: ReactElement;
};
export default function Modal(props: ModalProps) {
  const closeModal = () => props.setIsVisible(false);

  return (
    <Overlay
      isVisible={props.isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {props.children}
    </Overlay>
  );
}
const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff"
  }
});
