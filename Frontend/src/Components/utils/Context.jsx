import { createContext, useContext, useReducer, useState } from "react";
import React, { useEffect } from 'react'
import axios from 'axios'
import dataJson from '../../Data/products-1.json'


const reducer = (state, action) =>{
    switch(action.type) {
      case "GET_LISTA":
        return {...state, lista: action.payload }
      case 'ADD_VEHICLE':
          return { ...state, vehicles: [...state.vehicles, action.payload] };
      case "ADD_FAV":
        return {...state, favoritos: [...state.favoritos, action.payload]}
      case "DELETE_FAVS":
        return {...state, favoritos: []}
      case "TOGGLE_THEME":
        return { ...state, theme: state.theme === "lightTheme" ? "darkTheme" : "lightTheme" };
        default: 
        throw new Error()
    }
}


export const ContextGlobal = createContext(undefined);

const localFavs = JSON.parse(localStorage.getItem('favoritos'))
const initialFavState = localFavs ? localFavs : []


const initialState = {
  lista: [],
  vehicles: [],
  dentista: [],
  favoritos: initialFavState,
  theme: "lightTheme"
}


const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)


  const [usuario, setUsuario] = useState({
    nombreCompleto: " ",
    email: " ",
  })

  // Estados para el form
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)

  // Estados para los detalles de dentistas 
  const [dentista, setDentista] = useState([])

  const [vehicle, setVehicle] = useState([])



  /*const url = "https://jsonplaceholder.typicode.com/users/"*/

  useEffect(() => {
    axios(dataJson)
    .then(res => dispatch({type: "GET_LISTA", payload: res.data}))
    .catch(err => console.log(err))
    }, [])


    useEffect(() => {
      axios(dataJson)
        .then((res) => dispatch({ type: 'ADD_VEHICLE', payload: res.data }))
        .catch((err) => console.log(err));
    }, []);


useEffect(()=>{
    localStorage.setItem("favoritos", JSON.stringify(state.favoritos))
    }, [state.favoritos])


return (
    <ContextGlobal.Provider value={{dispatch, state, usuario, setUsuario, show, setShow, error, setError, dentista, setDentista, vehicle, setVehicle}}>
    {children}
    </ContextGlobal.Provider>
);
};



export default ContextProvider;

export const useGlobalStates = ()=> useContext(ContextGlobal)