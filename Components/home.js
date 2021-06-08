import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

//export default function Home({url, token, resetToken}) {
export default function Home({navigation}) {
 
  const [backEndUser, setBackEndUser] = useState()
/*
  useEffect(()=> {
      if (token && token.access.length > 0)
          getUser()
    },[token])
*/

useEffect(()=> {
  console.log("Estoy en HOME")
},[])
  const getUser=() => {

    const headers = new Headers()
    headers.append("Content-type", "application/json")
    headers.append("Authorization", "Bearer " + token.access)

    const requestOptions = {
      method:"GET",
      headers:headers,
     
    }

    return fetch(url +'api/usuario/me/', requestOptions )
    .then(resp => {
       if (!resp.ok)
         throw Error(resp.statusText)
      return resp.json()
      }
    )
    .then( jsonResp => {
      console.log("user", jsonResp)
      setBackEndUser(jsonResp)
    }
      )
    .catch( error => alert("Error:"+ error))
  }


  return (
    <View style={styles.container}>
          <Text>Home</Text>
      {/*
      <Text> Access Token : {token.access}</Text>
      <Text> User id: {backEndUser?backEndUser.id:"Vacio"}</Text>
      <Text> User name: {backEndUser?backEndUser.user.first_name:"Vacio"}</Text>

      <Button
      onPress= {()=>resetToken("")}
      title="Log Out"
    />
    */}

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
