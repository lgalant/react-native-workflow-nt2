import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Components/login'
import Home from './Components/home'

export default function App() {

  const [token, setToken] = useState("")


  const URL = 'https://200.73.130.166/'

  useEffect(()=> {
      traerToken()
  },[ ])

  
  const guardarToken= async (token) => {
    try {
      const jsonValue = JSON.stringify(token)
      await AsyncStorage.setItem('@api_token', jsonValue)
      setToken(token)
    } catch (e) {
      // saving error
    }
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
    } catch(e) {
      // clear error
    }
  
  }

  return (
    <View>

    { (token === "")?
    (<Login url = {URL} setToken={guardarToken}/>):
    (<Home url = {URL} token={token} resetToken={clearAll}/>)
  }
    </View>
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
