import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Components/login'
import Home from './Components/home'
import Detalle from './Components/detalle'
import GlobalContext from './Components/context'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

export default function App() {

  const [token, setToken] = useState("")
  const miStack = createStackNavigator()

  const URL = 'https://nexustest.roche.com.ar/'

  /*
  useEffect(()=> {
      traerToken()
  },[ ])

  */
  const guardarToken= async (token) => {
    try {
      const jsonValue = JSON.stringify(token)
      await AsyncStorage.setItem('@api_token', jsonValue)
      setToken(token)
    } catch (e) {
      // saving error
    }
  }


  const [loginData, setLoginData] = useState({
    username :"",
    first_name:"",
    email:"",
    token:""
  })

  const setName = (name) =>
  {
    setLoginData({...loginData, first_name:name})
  }


  const setToken2 = (token) =>
  {
    setLoginData({...loginData,token})
  }


  const traerToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@api_token')
      if (jsonValue != null)
        setToken(JSON.parse(jsonValue))
    } catch(e) {
      // error reading value
    }
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      setToken("")
      setToken2("") 
    } catch(e) {
      // clear error
    }
  
  }

  return (
    <GlobalContext.Provider value={{URL, loginData, setName, setToken2, clearAll}}>
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
