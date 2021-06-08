import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login({url, setToken}) {

  const [usuario, setUsuario] = useState("nt2")
  const [password, setPassword] = useState("12345nt2")


  const login=() => {

    console.log("LOGIN")
    const headers = new Headers()
    headers.append("Content-type", "application/json")

    const requestOptions = {
      method:"POST",
      headers:headers,
      body: JSON.stringify({"username": usuario, "password": password})
    }

    return fetch(url +'auth/jwt/create/', requestOptions )
    .then(resp => {
       if (!resp.ok)
         throw Error(resp.statusText)
      return resp.json()
      }
    )
    .then( jsonResp => {
      console.log("resp", jsonResp)
      setToken(jsonResp)
    }
      )
    .catch( error => alert("Error:"+ error))
  }




  return (
    <View style={styles.container}>

    <TextInput
      value={usuario}
      placeholder="Usuario"
      onChangeText={(text)=> setUsuario(text)}
    />
      

    <TextInput
      value={password}
      placeholder="Password"
      onChangeText={(text)=> setPassword(text)}
    />

    <Button
      onPress= {()=>login()}
      title="Log In"
    />



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
