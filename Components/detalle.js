import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import GlobalContext from '../Services/Global'


export default function Detalle({navigation}) {

    const {state} = useContext(GlobalContext)
    return(
        <View>
            <Text>Pagina de detalles</Text>
            <Text>Usuario: {state.first_name}</Text>
        </View>

    )
}