import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { useRentacarStates } from "../Context/Context";
import isFav from '../../public/images/isFav.svg'
import noFav from '../../public/images/noFav.svg'

//Este componente debera ser estilado como "dark" o "light" dependiendo del theme del Context

const Favs = () => {

  const {state, dispatch} = useRentacarStates()
  const token = localStorage.getItem("jwt")
  const [favs, setFavs] = useState([])

  useEffect(() => {
    getFavs()
  }, [])

  const handleFav = id => {
    if (token) {
                //     const updatedIds = localIdsProductosFavoritos.includes(id)
                //     ? localIdsProductosFavoritos.filter((favId) => favId !== id)
                //     : [...localIdsProductosFavoritos, id];
    
                // setLocalIdsProductosFavoritos(updatedIds);
        dispatch({ type: "TOGGLE_FAV", payload: id })
        setTimeout(() => {
        window.location.reload()
        }, 1000);
    } else {
        setError(true)
        return
    }
}

  const getFavs = () => {
    fetch("http://3.135.246.162/api/usuarios/favoritos", {
      method: "GET",
      headers: {
        "authorization": "Bearer " + token,
        "content-type": "application/json"
      }
    }).then(res => res.json())
    .then(data => setFavs(data))
  }

  const idsProductosFavoritos = favs.map(v => v.id);

  const renderizarIcono = (idProducto) => {
      return idsProductosFavoritos.includes(idProducto) ? (
          <img className='fav'
              onClick={() => handleFav(idProducto)}
              style={{ width: "200px !important", cursor: "pointer" }}
              src={isFav}
              alt="Favorito"
          />
      ) : (
          <img
          className='fav'
              onClick={() => handleFav(idProducto)}
              src={noFav}
              alt="No favorito"
          />
          )
  };

  return (
    <>
      <h1>Vehiculos Favs</h1>
      <div className="card-grid">
        {favs.map(fav =>
        <Card renderizarIcono={renderizarIcono} auto={fav} key={fav.id}/>)}
      </div>
    </>
  );
};

export default Favs;
