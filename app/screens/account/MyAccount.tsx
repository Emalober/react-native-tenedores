import React, { useState, useEffect } from "react";
import { auth } from "../../utils/firebase"
import { View, Text } from "react-native";

export default function MyAccount() {

    const [login, setLogin] = useState(null);
 
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user);
         !user ? setLogin(false) : setLogin(true);
        });
    }, []);

    if(login === null) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        );
    }

    if(login) {
        return (
            <View>
                <Text>Usuario logueado </Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Usuario no logueado </Text>
        </View>
    );
}