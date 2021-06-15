import React  from 'react';
export default React.createContext({})

export const Datos = {
    username :"",
    first_name:"",
    email:"",
    token:"",
    URL : 'https://nexustest.roche.com.ar/'

    /*
    usuario: {},
    viajes: [],
    ...
    */
}

export const reducer =(state,action) => {
    switch(action.type) {
        case 'LOGIN':
            const token = action.payload
            guardarToken(token)
            return {...state, token:token.access}
        case 'LOGOUT':
            clearAll()
            return {...state, token:""}
        case 'SET_NAME':
            const first_name = action.payload.user.first_name
            return {...state, first_name}
    }
}


const guardarToken= async (token) => {
    try {
      const jsonValue = JSON.stringify(token)
      await AsyncStorage.setItem('@api_token', jsonValue)
    } catch (e) {
      // saving error
    }
  }



  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
  }