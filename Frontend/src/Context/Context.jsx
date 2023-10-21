import axios from 'axios'
import {useContext, createContext, useState, useReducer, useEffect} from 'react'

const DentiStates = createContext()


const reducer = (state, action) => {
    switch(action.type){
        case 'GET_DENTISTAS':
            return {...state, dentistas: action.payload}
        case 'GET_DENTISTA':
            return {...state, dentista: action.payload}
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
    dentistas: [],
    dentista: {},
    favs: initialFavState,
    theme: ''
}


const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // const [dentistas, setDentista] = useState([])
    // const [favs, setFavs] = useState(initialFavState)
    //const [theme, setTheme] = useState(true) --> Modo oscuro
    
    const url = 'https://jsonplaceholder.typicode.com/users'

    useEffect(() => {
        axios(url)
        .then(res => dispatch({type: 'GET_DENTISTAS', payload: res.data}))
    }, [])

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(state.favs))
    },[state.favs])


    return (
        <DentiStates.Provider value={{state,dispatch}}>
            {children}
        </DentiStates.Provider>
    )
}

export default Context

export const useDentiStates = () => useContext(DentiStates)