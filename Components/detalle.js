import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import GlobalContext from './context'

//export default function Login({url, setToken}) {

export default function Detalle({navigation}) {

    const context = useContext(GlobalContext)
    return(
        <View>
            <Text>Pagina de detalles</Text>
            <Text>Usuario: {context.loginData.first_name}</Text>
        </View>

    )
}