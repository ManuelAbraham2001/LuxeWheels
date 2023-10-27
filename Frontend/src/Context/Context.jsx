import axios from 'axios'
import {useContext, createContext, useState, useReducer, useEffect} from 'react'
import dataJson from '../Data/products-1.json'

const RentacarStates = createContext()


const reducer = (state, action) => {
    switch(action.type){
        case 'GET_VEHICLES':
            return {...state, vehicles: action.payload}
        case 'GET_VEHICLE':
            return {...state, vehicle: action.payload}
        case 'ADD_VEHICLE':
                return { ...state, vehicles: [...state.vehicles, action.payload] };    
        case 'ADD_FAV':
            return {...state, favs: [...state.favs, action.payload]}
        case 'DELETE_FAV':
            return {...state, favs: state.favs.filter(fav => fav.id !== action.payload.id)}
        case 'SWITCH_THEME':
            return  {...state, theme: state.theme === '' ? 'dark' : '' }; 
        default:
            throw new Error()
    }
    //accion para borrar favoritos
}

const localFavs = JSON.parse(localStorage.getItem('favs'))
const initialFavState = localFavs ? localFavs : []




const initialState = {
    list: [],
    vehicles: [],
    vehicle: [],
    add_vehicles: [],
    favs: initialFavState,
    theme: "lightTheme"
}


const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //const [favs, setFavs] = useState(initialFavState)




    useEffect(() => {

          dispatch({ type: 'GET_VEHICLES', payload: dataJson });

          localStorage.setItem('local_vehicles', JSON.stringify(dataJson));
        


    }, [dispatch]);
  

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(state.favs))
    },[state.favs])


    return (
        <RentacarStates.Provider value={{state,dispatch}}>
            {children}
        </RentacarStates.Provider>
    )
}

export default Context

export const useRentacarStates = () => useContext(RentacarStates)
