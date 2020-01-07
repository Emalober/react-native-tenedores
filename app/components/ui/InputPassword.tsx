import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

type InputPasswordProps = {
  placeholder: string;
  errorMessage?: string;
  setPassword?: (e: string) => void;
};

export default function InputPassword({
  placeholder,
  errorMessage,
  setPassword
}: InputPasswordProps) {
  const [hidePassword, setHidePasword] = useState(true);

  return (
    <Input
      placeholder={placeholder}
      secureTextEntry={hidePassword}
      containerStyle={styles.input}
      onChange={e => setPassword(e.nativeEvent.text)}
      rightIcon={{
        type: "material-community",
        name: hidePassword ? "eye-outline" : "eye-off-outline",
        color: "#2c2c2c",
        onPress: () => setHidePasword(!hidePassword)
      }}
      errorMessage={errorMessage}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10
  }
});
