import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { NavigationScreenProp, NavigationState } from "react-navigation";

type UserGuestProps = {
  navigation: NavigationScreenProp<NavigationState>;
};

function UserGuest(props: UserGuestProps) {
  const { navigation } = props;

  const handleLoginPress = (): void => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Consulta tu perfil de 5 Tenedores</Text>
      <Text style={styles.description}>
        ¿Como describirias tu mejor restauranes? Busca y visualiza los mejores
        lugares para comer. Vota los que mas te han gustado y comenta tu
        experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={handleLoginPress}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40
  },
  text: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center"
  },
  description: {
    marginBottom: 20,
    textAlign: "center"
  },
  viewBtn: {
    flex: 1,
    alignItems: "center"
  },
  btn: {
    backgroundColor: "#00a680"
  },
  btnContainer: {
    width: "70%"
  }
});
