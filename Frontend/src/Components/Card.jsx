import React from "react";
import { Link } from "react-router-dom";
import { useDentiStates } from '../Context/Context'



const Card = ({ dentista }) => {
  const {state, dispatch} = useDentiStates()
  const findDentista = state.favs.find(fav => fav.id == dentista.id)

  const addFav = ()=>{
    if(findDentista){
      dispatch({type: 'DELETE_FAV', payload: findDentista})
    } else {
      dispatch({type: 'ADD_FAV', payload: dentista})
    }
    // 
    
  }



  return (
    <div className="card">
        <Link to={'/detail/' + dentista.id}>  
            <img src="/images/doctor.jpg" alt="" className="card-image"/>
            <h3>{dentista.name}</h3>
            <h4>{dentista.username}</h4>
        </Link>

        {/* Ademas deberan integrar la logica para guardar cada Card en el localStorage */}
        <button onClick={addFav} className="favButton">{findDentista ? '🌟' : '⭐'}</button>
        {/* () => setFavs((prevFavs) => [...prevFavs, odontologo]) */}
    </div>
  );
};

export default Card;
