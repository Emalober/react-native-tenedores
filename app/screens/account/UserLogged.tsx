import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

export default function UserGuest() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("Cargando...");
  const toastRef = useRef();

  useEffect(() => {
    console.log("Se carga perfil del usuario.");

    (async () => {
      const user = await firebase.auth().currentUser;
      //console.log(user);
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />

      <Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()} />

      <Toast ref={toastRef} position="center" opacity={0.8} />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}
