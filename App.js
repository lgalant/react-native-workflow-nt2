import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Components/login'
import Home from './Components/home'
import Detalle from './Components/detalle'
import GlobalContext, {Datos, reducer} from './Services/Global'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { useReducer } from 'react';

export default function App() {

  const [token, setToken] = useState("")
  const miStack = createStackNavigator()

  const [state, dispatch] = useReducer(reducer, Datos)
   


  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
        <miStack.Navigator initialRouteName={"Principal"}>
          <miStack.Screen name="Principal" component={Home}/>
          <miStack.Screen name="LogIn" component={Login}/>
          <miStack.Screen name="Detalle" component={Detalle}/>
        </miStack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
