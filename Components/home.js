import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState , useContext} from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import GlobalContext from './context'

//export default function Home({url, token, resetToken}) {
export default function Home({navigation}) {
 
  const [backEndUser, setBackEndUser] = useState()
/*
  useEffect(()=> {
      if (token && token.access.length > 0)
          getUser()
    },[token])
*/

const context = useContext(GlobalContext)


useEffect(() =>{
    
  if (!context.loginData.token || context.loginData.token.access.length == 0) {
      navigation.navigate("LogIn")
  }
   else 
    getUser()
  },[context.loginData.token])



useEffect(()=> {
  console.log("Estoy en HOME")
},[])
  const getUser=() => {

    const headers = new Headers()
    headers.append("Content-type", "application/json")
    headers.append("Authorization", "Bearer " + context.loginData.token.access)

    const requestOptions = {
      method:"GET",
      headers:headers,
     
    }

    return fetch(context.URL +'api/usuario/me/', requestOptions )
    .then(resp => {
       if (!resp.ok)
         throw Error(resp.statusText)
      return resp.json()
      }
    )
    .then( jsonResp => {
      console.log("user", jsonResp)
      setBackEndUser(jsonResp)
      context.setName(jsonResp.user.first_name)
    }
      )
    .catch( error => alert("Error:"+ error))
  }


  return (
    <View style={styles.container}>
          <Text>Home</Text>
     
      <Text> Access Token : {context.loginData.token.access}</Text>
      <Text> User id: {backEndUser?backEndUser.id:"Vacio"}</Text>
      <Text> User name: {backEndUser?backEndUser.user.first_name:"Vacio"}</Text>
      <Text> User name context: {context.loginData?context.loginData.first_name:"Vacio"}</Text>

      <Button
       onPress= {()=>context.clearAll()}
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
