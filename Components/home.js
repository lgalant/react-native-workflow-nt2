import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState , useContext} from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import GlobalContext from '../Services/Global'

export default function Home({navigation}) {

const {state, dispatch} = useContext(GlobalContext)


const traerToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@api_token')
    if (jsonValue != null)
      dispatch({type:'LOGIN',payload: jsonValue})
  } catch(e) {
    // error reading value
  }
}

useEffect(() =>{
    
  if ( state.token.length == 0) {
      traerToken()
      navigation.navigate("LogIn")
  }
   else 
    getUser()
  },[state.token])



useEffect(()=> {
  console.log("Estoy en HOME")
},[])

  const getUser=() => {

    const headers = new Headers()
    headers.append("Content-type", "application/json")
    headers.append("Authorization", "Bearer " + state.token)

    const requestOptions = {
      method:"GET",
      headers:headers,
     
    }

    return fetch(state.URL +'api/usuario/me/', requestOptions )
    .then(resp => {
       if (!resp.ok)
         throw Error(resp.statusText)
      return resp.json()
      }
    )
    .then( jsonResp => {
      console.log("user", jsonResp)
      dispatch({type:'SET_NAME', payload:jsonResp})
    }
      )
    .catch( error => alert("Error:"+ error))
  }


  return (
    <View style={styles.container}>
          <Text>Home</Text>
     
      <Text> Access Token : {state.token}</Text>
      <Text> User name context: {state.first_name}</Text>

      <Button
       onPress= {()=>dispatch({type:'LOGOUT'})}
      title="Log Out"
    />

    <Button
      onPress= {()=>navigation.navigate("Detalle")}
      title="Ir a detalle"
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
