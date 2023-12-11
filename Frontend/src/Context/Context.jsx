import axios from 'axios'
import { useContext, createContext, useState, useReducer, useEffect, useNavigate } from 'react'
import dataJson from '../Data/products-1.json'
import { jwtDecode } from "jwt-decode";

const RentacarStates = createContext()


const reducer = (state, action) => {

    switch (action.type) {
        case 'GET_VEHICLES':
            return { ...state, vehicles: action.payload }
        case 'GET_VEHICLE':
            return { ...state, vehicle: action.payload }
        case 'ADD_VEHICLE':
            return { ...state, vehicles: [...state.vehicles, action.payload] };
        case 'TOGGLE_FAV':
            fetch("http://3.135.246.162/api/usuarios/favoritos/" + action.payload, {
                method: "POST",
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            
        case 'SWITCH_THEME':
            return { ...state, theme: state.theme === '' ? 'dark' : '' };
        case 'LOGIN':

            fetch("http://3.135.246.162/api/auth/login", {
                method: 'POST',
                body: JSON.stringify(action.payload.user),
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => res.json())
                .then(data => {
                    localStorage.setItem('jwt', data.token)
                    if (!state.isAuthenticated) {
                        return { ...state, isAuthenticated: true, user: action.payload.user };
                    }
                }).then(() => {
                    window.location.href = '/';
                })

            return state;
        case 'LOGOUT':
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            return { ...state, isAuthenticated: false };

        default:
            throw new Error()
    }
    //accion para borrar favoritos
}

const localFavs = JSON.parse(localStorage.getItem('favs'))
let isAdmin = null;


try {
    const token = localStorage.getItem('jwt')
    const decoded = jwtDecode(token);
    isAdmin = decoded.esAdmin
} catch (error) {
    console.log(error);
}


const initialFavState = localFavs ? localFavs : []

const initialState = {
    list: [],
    vehicles: [],
    vehicle: [],
    add_vehicles: [],
    favs: initialFavState,
    isAdmin,
    isAuthenticated: true ? localStorage.getItem('jwt') != null : false,
    user: null,
    theme: "lightTheme"
}


const Context = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //const [favs, setFavs] = useState(initialFavState)
    useEffect(() => {

        dispatch({ type: 'GET_VEHICLES', payload: dataJson });

        localStorage.setItem('local_vehicles', JSON.stringify(dataJson))

    }, [dispatch]);


    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(state.favs))
    }, [state.favs])


    return (
        <RentacarStates.Provider value={{ state, dispatch }}>
            {children}
        </RentacarStates.Provider>
    )
}

export default Context

export const useRentacarStates = () => useContext(RentacarStates)
